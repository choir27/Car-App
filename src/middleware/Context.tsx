import { createContext } from "react";
import { Profile } from "./Interfaces/General";
import { User } from "./Interfaces/Auth";
import { CartItem } from "./Interfaces/Cart";
import { PurchasedItem } from "./Interfaces/Purchases";
import { InventoryItem } from "./Interfaces/Inventory";
import { Appointment } from "./Interfaces/Reservation";

type T = {
  inventory: InventoryItem[];
  cart: CartItem[];
  appointments: Appointment[];
  setAppointments: (e: Appointment[]) => void;
  purchases: PurchasedItem[];
  user: User;
  employee: Profile;
};

type L = {
  toggleDarkMode: string,
  setToggleDarkMode: (e: string) => void
}

export const APIContext = createContext<T>({
  inventory: [],
  cart: [],
  appointments: [],
  setAppointments: (e: Appointment[]) => e,
  purchases: [],
  user: {
    $createdAt: "",
    $updatedAt: "",
    email: "",
    $id: "",
    name: "",
    phone: "",
    phoneVerification: true,
    emailVerification: true,
    passwordUpdate: "",
    status: true,
    prefs: [],
    registration: "",
  },
  employee: {
    $id: "",
    fileName: "",
    position: "",
    salary: "",
  },
});

export const DarkModeContext = createContext<L>({
  toggleDarkMode: '',
  setToggleDarkMode: (e: string) => e
});