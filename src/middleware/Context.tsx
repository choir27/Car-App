import { createContext } from "react";
import {
  Profile,
  User,
  InventoryItem,
  CartItem,
  Appointment,
  PurchasedItem,
  Estimate,
} from "./Interfaces";

type T = {
  inventory: InventoryItem[];
  cart: CartItem[];
  appointments: Appointment[];
  setAppointments: (e: Appointment[]) => void;
  purchases: PurchasedItem[];
  user: User;
  employee: Profile;
};

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
