import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { ButtonLink } from "../../components/Button";
import { cacheEmail } from "../../middleware/Cache";

export function EmployeeButtons(){
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