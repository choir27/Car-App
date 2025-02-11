import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { ButtonLink } from "../../components/Button";
import { cacheEmail } from "../../middleware/Cache";
import { DarkModeContext } from "../../middleware/Context";
import { useContext } from "react";

export function EmployeeButtons() {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <main className="flex flex-col justify-between">
      <Nav pageHeading={cacheEmail ? "Employee Hub" : "Login/Demo"} />

      <div className="flex flex-col items-center">
        <section className={`w-20 h-36vh mx-2 p-6 flex flex-col shadow-2xs ${toggleDarkMode === "dark" ? "light" : "dark"}`} id="employee">
          <ul className="flex justify-between items-center flex-col h-36vh">
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
        </section>
      </div>

      <Footer />
    </main>
  );
}
