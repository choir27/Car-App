import { Input } from "./Inputs/Inputs";
import api from "../api/api";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ButtonLink, Button } from "../components/Button";
import { Permission, Role } from "appwrite";
import { toast } from "react-toastify";
import PaginatedButtons from "../components/Graphs/PaginatedButtons";
import {
  PurchasedItem,
  Profile,
  History,
  Customize,
  Notification,
  User,
} from "../middleware/Interfaces";
import { cacheEmail } from "../middleware/Cache";

export function RenderEmployeeAppointments(
  purchases: PurchasedItem[],
  startIndex: number,
  endIndex: number,
) {
  return purchases
    .map((cart: PurchasedItem, i: number) => {
      let cartTotal = 0;

      for (let i = 0; i < cart.cartItems.length; i++) {
        const cartItem: PurchasedItem = JSON.parse(cart.cartItems[i]);
        if (cartItem.email === cacheEmail) {
          const itemTotal =
            Number(cartItem.price) * parseInt(cartItem.quantity);

          cartTotal += itemTotal;
        }
      }

      return (
        <section
          key={`${cart.$createdAt}-${i}`}
          className="flex justifyEvenly cartItem"
        >
          <h2>Items Sold: {cart.cartItems.length}</h2>
          <h2>Total: ${cartTotal.toFixed(2)}</h2>
        </section>
      );
    })
    .slice(startIndex, endIndex);
}

export function RenderEmployeeProfit(purchases: PurchasedItem[]) {
  let cartTotal = 0;

  purchases.forEach((cart: PurchasedItem) => {
    for (let i = 0; i < cart.cartItems.length; i++) {
      const cartItem: PurchasedItem = JSON.parse(cart.cartItems[i]);

      if (cartItem.email === cacheEmail) {
        const itemTotal = Number(cartItem.price) * parseInt(cartItem.quantity);

        cartTotal += itemTotal;
      }
    }
  });

  return cartTotal.toFixed(2);
}

export function FileInput(setFile: (e: FileList | null) => void) {
  return (
    <input
      type="file"
      id="file"
      name="file"
      className="displayNone"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const test: FileList | null = e.target.files;
        setFile(test);
      }}
    />
  );
}

export function EmployeeForm(
  setSalary: (e: string) => void,
  setPosition: (e: string) => void,
) {
  return (
    <section className="flex flex-col alignCenter justifyCenter ">
      {Input({
        type: "text",
        onChange: (e) => setSalary(e),
        placeholder: "Set Salary",
      })}
      {Input({
        type: "text",
        onChange: (e) => setPosition(e),
        placeholder: "Set Position",
      })}
    </section>
  );
}

export function EmployeeButtons() {
  return (
    <main className="flex flex-col justifyBetween">
      <Nav pageHeading={cacheEmail ? "Employee Hub" : "Login/Demo"} />

      <section className="flex flex-col alignCenter" id="employee">
        <nav>
          <ul className="flex justifyBetween flex-col">
            {cacheEmail ? (
              ""
            ) : (
              <li className="textAlignCenter">
                {ButtonLink({ domain: "/adminDemo", text: "Admin Demo" })}
              </li>
            )}
            {cacheEmail ? (
              ""
            ) : (
              <li className="textAlignCenter">
                {ButtonLink({ domain: "/demo", text: "Demo" })}
              </li>
            )}
            {cacheEmail ? (
              ""
            ) : (
              <li className="textAlignCenter">
                {ButtonLink({ domain: "/login", text: "Login" })}
              </li>
            )}
          </ul>
        </nav>
      </section>

      <Footer />
    </main>
  );
}

export async function handleEmployeeCustomization(props: Customize) {
  try {
    if (props.email && (props.salary || props.position)) {
      const findUser = props.listOfUsers.filter(
        (employee: User) => employee.email === props.email,
      )[0];

      const employeeList = await api.listDocuments(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_PROFILE_COLLECTION_ID,
      );

      const findEmployee = employeeList.documents.filter(
        (employee: Profile) => employee.email === props.email,
      );

      const data = {
        userID: findUser.$id,
        email: props.email,
        salary: props.salary ? props.salary : findEmployee[0].salary,
        position: props.position ? props.position : findEmployee[0].position,
      };

      if (findEmployee.length) {
        await api.updateDocument(
          import.meta.env.VITE_REACT_APP_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_PROFILE_COLLECTION_ID,
          findEmployee[0].$id,
          data,
        );
        window.location.reload();
      } else {
        await api.createDocument(
          import.meta.env.VITE_REACT_APP_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_PROFILE_COLLECTION_ID,
          data,
          [Permission.read(Role.any())],
        );
        window.location.reload();
      }
    } else {
      toast.error(
        "Please Fill Out Your Email And At Least The Salary, Position And Try Again!",
      );
    }
  } catch (err) {
    console.error(err);
  }
}