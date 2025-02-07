import { useState, useEffect, useContext } from "react";
import { ButtonLink, ButtonSubmit } from "../components/Button";
import { handleLogout } from "../hooks/hooks/AuthHooks";
import { Link } from "react-router-dom";
import EmployeeNav from "./EmployeeNav";
import { CartItem } from "../middleware/Interfaces/Cart";
import { nav } from "../middleware/Interfaces/General";
import { cacheEmail } from "../middleware/Cache";
import { APIContext } from "../middleware/Context";

export default function MobileNav(props: nav) {
  const [cartQuantity, setCartQuantity] = useState<number>();
  const { cart } = useContext(APIContext);

  useEffect(() => {
    if (cacheEmail && cart?.length) {
      let sum: number = 0;

      cart.forEach((item: CartItem) =>
        item.email === cacheEmail ? (sum += parseInt(item.quantity)) : "",
      );

      setCartQuantity(sum);
    }
  }, [cart]);

  return (
    <header className="w-full m-2">
      <nav className="flex w-full justify-between">
        <Link to="/" className="w-full">
          <h1>AutoAligners</h1>
        </Link>
        <ul className="flex w-80 justify-between">
          <li className="items-center flex">
            <Link to="/">{cacheEmail ? "Employee Hub" : "Home"}</Link>
          </li>
          {cacheEmail ? (
            <li className="items-center flex">
              <EmployeeNav />
            </li>
          ) : (
            <li className="items-center flex">
              <Link to="/employee">Login/Demo</Link>
            </li>
          )}
          {cacheEmail ? (
            <li className="items-center flex">
              <Link to="/manageAppointments">Manage Appointments</Link>
            </li>
          ) : (
            ""
          )}
          {cacheEmail ? (
            <li className="items-center flex">
              {cart?.length && cartQuantity ? <span>{cartQuantity}</span> : ""}
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          ) : (
            ""
          )}

          {cacheEmail ? (
            <div className="items-center flex">
              {ButtonSubmit({
                handleButtonClick: () => handleLogout(),
                text: "Logout",
              })}
            </div>
          ) : (
            ""
          )}
          {cacheEmail ? (
            ""
          ) : (
            <div className="items-center flex">
              {ButtonLink({ domain: "/reservation", text: "Make Reservation" })}
            </div>
          )}
        </ul>
      </nav>

      <h2>{props.pageHeading}</h2>
    </header>
  );
}
