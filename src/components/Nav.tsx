import { useState, useEffect, useContext } from "react";
import { ButtonLink, ButtonSubmit } from "../components/Button";
import { handleLogout } from "../hooks/hooks/AuthHooks";
import { Link } from "react-router-dom";
import EmployeeNav from "./EmployeeNav";
import { CartItem } from "../middleware/Interfaces/Cart";
import { nav } from "../middleware/Interfaces/General";
import { cacheEmail } from "../middleware/Cache";
import { APIContext, DarkModeContext } from "../middleware/Context";
import { DarkMode } from "../hooks/hooks/DarkMode";
import { FaShoppingCart } from "react-icons/fa";

export default function Nav(props: nav) {
  const [cartQuantity, setCartQuantity] = useState<number>();
  const { cart } = useContext(APIContext);
  const { toggleDarkMode } = useContext(DarkModeContext);
  const toggleButton = toggleDarkMode === "light" ? "lightBtn" : "darkBtn"

  useEffect(() => {
    if (cacheEmail && cart?.length) {
      let sum: number = 0;

      cart.forEach((item: CartItem) =>
        item.email === cacheEmail ? (sum += parseInt(item.quantity)) : "",
      );

      setCartQuantity(sum);
    }
  }, [cart]);

  const url = window.location.href;
  const splitUrl = url.split("/");
  const currentUrl = splitUrl[splitUrl.length-1]

  return (
    <header className="w-full">
      <nav className={`${toggleDarkMode === "dark" ? "bg-nav" : "darkNav"} bg-nav flex w-full justify-between`}>
        <div className="flex items-center">
        <Link to="/" className = "p-2">
          <h1>AutoAligners</h1>
        </Link>
        {DarkMode()}
        </div>
 

        <ul className="flex w-40 justify-between">
          <li className="items-center flex">
            <Link to="/" className={`${currentUrl === "" ? "current-link" : "" }`}>Home</Link>
          </li>
          {cacheEmail ? (
            <li className="items-center flex">
              <EmployeeNav />
            </li>
          ) : (
            <li className="items-center flex">
              <Link to="/employee" className={`${currentUrl === "employee" ? "current-link" : "" }`}>Login/Demo</Link>
            </li>
          )}

          {cacheEmail ? (
            <li className="cart flex items-center">
              {cart?.length && cartQuantity ? <span className="cartQuantity">{cartQuantity}</span> : ""}
              <Link to="/cart" className={`${currentUrl === "cart" ? "current-link" : "" }`}>
                <FaShoppingCart />
              </Link>
            </li>
          ) : (
            ""
          )}

          {cacheEmail ? (
            <div className="items-center flex p-2">
              {ButtonSubmit({
                className: `${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`,
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
            <div className="items-center flex p-2">
              {ButtonLink({ classNames: `${toggleButton} ${currentUrl === "reservation" ? "current-link" : "" }` ,domain: "/reservation", text: "Make Reservation" })}
            </div>
          )}
        </ul>
      </nav>

      <h2 className="p-4">{props.pageHeading}</h2>
    </header>
  );
}
