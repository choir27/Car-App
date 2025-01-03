import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import {
  PrivateRoutes,
  PublicRoutes,
  PurchaseRoutes,
} from "./middleware/Routes.jsx";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeHub } from "./pages/employee/Employee";
import { APIContext } from "./middleware/Context";
import { cacheEmail } from "./middleware/Cache";
import {
  Profile,
  InventoryItem,
  CartItem,
  Appointment,
  PurchasedItem,
  User,
} from "./middleware/Interfaces";
import {
  GetEmployee,
  GetInventory,
  GetCart,
  GetAppointmentData,
  GetPurchases,
  GetAccount,
} from "./hooks/ApiCalls";
import {
  defaultEmployee,
  defaultUser,
  Home,
  Employee,
  Demo,
  AdminDemo,
  Reservation,
  Cart,
  Inventory,
  InventoryShop,
  EmployeeSettings,
  ManageAppointments,
  EditAppointment,
  Purchases,
} from "./Pages";

export default function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [purchases, setPurchases] = useState<PurchasedItem[]>([]);
  const [user, setUser] = useState<User>(defaultUser);
  const [employee, setEmployee] = useState<Profile>(defaultEmployee);

  useEffect(() => {
    if (cacheEmail) {
      GetInventory((e: InventoryItem[]) => setInventory(e));
      GetCart((e: CartItem[]) => setCart(e));
      GetAppointmentData((e: Appointment[]) => setAppointments(e));
      GetPurchases((e: PurchasedItem[]) => setPurchases(e));
      GetAccount((e: User) => setUser(e));
      GetEmployee((e: Profile) => setEmployee(e));
    }
  }, []);

  return (
    <APIContext.Provider
      value={{
        inventory,
        cart,
        appointments,
        setAppointments,
        purchases,
        user,
        employee,
      }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoutes />}>
              <Route path="/employee" element={<Employee />} />
              <Route path="/login" element={<EmployeeHub />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/adminDemo" element={<AdminDemo />} />
              <Route path="/reservation" element={<Reservation />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventoryShop" element={<InventoryShop />} />
              <Route path="/settings" element={<EmployeeSettings />} />
              <Route
                path="/manageAppointments"
                element={<ManageAppointments />}
              />
              <Route path="/editAppointment" element={<EditAppointment />} />
              <Route element={<PurchaseRoutes />}>
                <Route path="/purchases" element={<Purchases />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Suspense>
    </APIContext.Provider>
  );
}
