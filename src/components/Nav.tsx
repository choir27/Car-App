import { useState, useEffect, useContext } from "react";
import { ButtonLink, ButtonSubmit } from "../components/Button";
import { handleLogout } from "../hooks/Login/Logout";
import { Link } from "react-router-dom";
import EmployeeNav from "./EmployeeNav";
import { CartItem } from "../middleware/Interfaces/Cart";
import { nav } from "../middleware/Interfaces/General";
import { cacheEmail } from "../middleware/Cache";
import { APIContext } from "../middleware/Context";

export default function Nav(props: nav) {
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
    <header>
      <nav className="flex justifyBetween alignCenter">
        <Link to="/">
          <h1>AutoAligners</h1>
        </Link>
        <ul className="flex alignCenter justifyEvenly">
          <li>
            <Link to="/">{cacheEmail ? "Employee Hub" : "Home"}</Link>
          </li>
          {cacheEmail ? (
            <li>
              <EmployeeNav />
            </li>
          ) : (
            <li>
              <Link to="/employee">Login/Demo</Link>
            </li>
          )}
          {cacheEmail ? (
            <li>
              <Link to="/manageAppointments">Manage Appointments</Link>
            </li>
          ) : (
            ""
          )}
          {cacheEmail ? (
            <li className="cart">
              {cart?.length && cartQuantity ? <span>{cartQuantity}</span> : ""}
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping button"></i>
              </Link>
            </li>
          ) : (
            ""
          )}

          {cacheEmail ? (
            <div>
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
            <div>
              {ButtonLink({ domain: "/reservation", text: "Make Reservation" })}
            </div>
          )}
        </ul>
      </nav>

      <h2>{props.pageHeading}</h2>
    </header>
  );
}
