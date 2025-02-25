import api from "../../api/api.jsx";
import {
  Car,
  CarSelectData,
  Appointment,
} from "../../middleware/Interfaces/Reservation.js";
import { CartItem } from "../../middleware/Interfaces/Cart.js";
import { InventoryItem } from "../../middleware/Interfaces/Inventory.js";
import { PurchasedItem } from "../../middleware/Interfaces/Purchases.js";
import { Profile } from "../../middleware/Interfaces/General.js";
import { User } from "../../middleware/Interfaces/Auth.js";
import { toast } from "react-toastify";
import {
  cacheEmail,
  SetCacheEdit,
  cacheAppointmentID,
} from "../../middleware/Cache.js";
import { Query } from "appwrite";
import axios from "axios";
import { carData } from "../../api/data.jsx";

//Get Cart data
export async function GetCart(setCart: (e: CartItem[]) => void) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_CART_COLLECTION_ID,
    );

    if (data.documents.length) {
      setCart(
        data.documents.filter((item: CartItem) => item.email === cacheEmail),
      );
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

//Get data for apppointment we want to edit
export async function GetEditAppointmentData({setAppointment}:{setAppointment: (e:Appointment | null)=>void}) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_COLLECTION_ID,
    );

    const findAppointment = data.documents.filter(
      (appointment: Appointment) => appointment.$id === sessionStorage.getItem("id"),
    );

    setAppointment(findAppointment[0]);
    SetCacheEdit(findAppointment[0]);
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

//Get inventory data
export async function GetInventory(setInventory: (e: InventoryItem[]) => void) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID,
    );

    if (data.documents.length) {
      setInventory(data.documents);
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

//Get purchase data
export async function GetPurchases(
  setPurchases: (e: PurchasedItem[]) => void,
  limit?: number,
) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_PURCHASES_COLLECTION_ID,
      [Query.limit(100)],
    );

    if (limit) {
      const response = await api.listDocuments(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_PURCHASES_COLLECTION_ID,
        [Query.limit(limit), Query.offset(limit - 25)],
      );

      const array = response.documents;
      setPurchases(array);
    } else if (data.documents.length) {
      setPurchases(data.documents);
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

//Get appointment data
export async function GetAppointmentData(
  setAppointments: (e: Appointment[]) => void,
) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_COLLECTION_ID,
    );

    if (data.documents.length) {
      setAppointments(
        data.documents.sort((a: Appointment, b: Appointment) => {
          if (a.$createdAt && b.$createdAt) {
            return (
              new Date(b.$createdAt).getTime() -
              new Date(a.$createdAt).getTime()
            );
          }
        }),
      );
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

//Get currently logged in account
export async function GetAccount(setUser: (e: User) => void) {
  try {
    const user = await api.getAccount();

    if (user) {
      setUser(user);
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export async function GetCarData(props: CarSelectData) {
  try {
    // sets form options to all car makes

    const uniqueCarOptions: string[] = [];

    carData.forEach((car: Car) =>
      uniqueCarOptions.indexOf(car.manufacturer) === -1
        ? uniqueCarOptions.push(car.manufacturer)
        : "",
    );

    const carOptions: React.JSX.Element[] = uniqueCarOptions
      .sort((a: string, b: string) => a.localeCompare(b))
      .map((car: string, i: number) => <option key={i}>{car}</option>);
    //onMakeSelect is a setState() here, so we make it a separate function here to prevent re-rendering

    const makeSelect = () => props.onMakeSelect(carOptions);
    makeSelect();

    if (props.carMake && props.carMake !== "Select Car Make") {
      //sets form options to all car models available for selected car make value
      //returning false is there to 1. prevent the warning to appear that filter method expects a returned value 2. to return a value that won't affect the current existing desired functionality

      const uniqueCarOptions: string[] = [];

      carData.filter((car: Car) => {
        if (
          car.manufacturer === props.carMake &&
          uniqueCarOptions.indexOf(car.model) === -1
        ) {
          uniqueCarOptions.push(car.model);
          return car.model;
        }
      });

      //returns a new array of react jsx element with new car model values that are respective to selected car make value
      const carOptions: React.JSX.Element[] = uniqueCarOptions
        .sort((a: string, b: string) => a.localeCompare(b))
        .map((car: string, i: number) => {
          return <option key={i}>{car}</option>;
        });
      const modelSelect = () => props.onModelSelect(carOptions);
      modelSelect();
    }

    if (
      props.carMake &&
      props.carModel &&
      props.carMake !== "Select Car Make" &&
      props.carModel !== "Select Car Model"
    ) {
      //sets form options to all car years available for car make and car models
      const response = carData.filter((car: Car) => {
        let year = 0;
        if (
          car.manufacturer === props.carMake &&
          car.model === props.carModel
        ) {
          year = car.year;
        }
        return year;
      });

      //returns a new array of react jsx element with new car year values that are respective to selected car make & model value
      const carOptions: React.JSX.Element[] = response.map(
        (car: Car, i: number) => <option key={i}>{car.year}</option>,
      );
      const yearSelect = () => props.onYearSelect(carOptions);
      yearSelect();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
