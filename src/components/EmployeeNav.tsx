import { useState } from "react";
import { ButtonLink } from "./Button";
import { cacheEmail } from "../middleware/Cache";
import { DarkModeContext } from "../middleware/Context";
import { useContext } from "react";

export default function EmployeeNav() {
  const [hidden, setHidden] = useState(false);
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <section>
      <h3 className="cursor-pointer employeeLink" onClick={() => setHidden(!hidden)}>
        Employee Nav
      </h3>

      <div className={`employeeNav ${hidden ? "flex" : "hidden"}`}>
        {ButtonLink({
          classNames: `${
            toggleDarkMode === "light" ? "lightBtn" : "darkBtn"
          } mb-4`,
          text: "Manage Appointments",
          domain: "/manageAppointments",
        })}
        {ButtonLink({
          classNames: `${
            toggleDarkMode === "light" ? "lightBtn" : "darkBtn"
          } mb-4`,
          text: "Current Inventory",
          domain: "/inventory",
        })}
        {ButtonLink({
          classNames: `${
            toggleDarkMode === "light" ? "lightBtn" : "darkBtn"
          } mb-4`,
          text: "Shop for Inventory",
          domain: "/inventoryShop",
        })}
        {cacheEmail?.toLowerCase() === "bobthebuilder@gmail.com"
          ? ButtonLink({
              classNames: `${
                toggleDarkMode === "light" ? "lightBtn" : "darkBtn"
              } mb-4`,
              text: "Purchase History",
              domain: "/purchases",
            })
          : ""}
        {ButtonLink({
          classNames: `${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`,
          text: "Settings",
          domain: "/settings",
        })}
      </div>
    </section>
  );
}
