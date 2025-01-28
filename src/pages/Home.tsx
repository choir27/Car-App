import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ButtonLink } from "../components/Button";
import Assets from "../components/Assets.jsx";
import Employee from "./employee/Employee";
import { cacheEmail } from "../middleware/Cache";
import "./home.css"

export default function Home() {
  return (
    <>
      {cacheEmail ? (
        <Employee />
      ) : (
        <main className="minh-screen m-2 flex flex-col items-center justify-between">
          <Nav pageHeading="" />
          <section className="flex justify-between">

            <section className="w-40 flex flex-col items-start justify-between">
              <div>
              <h2 className="mb-2">Say Goodbye to Car Repair Hassles</h2>

              <p className="w-80">
                For over a century, dating back to 1892, we have been steadfast
                in providing exceptional service. Our commitment to delivering
                the finest quality service has been instrumental in establishing
                a strong reputation. We are determined to continue building on
                this legacy with your support.
              </p>
              </div>
              {cacheEmail
                ? ButtonLink({ domain: "/employee", text: "Employee Hub" })
                : ButtonLink({
                    domain: "/reservation",
                    text: "Make Reservation",
                  })}
            </section>

            <div className="w-40">
              <img src={Assets.whiteCar} alt="white car" className="maxw-full"/>
            </div>
          </section>
          <Footer />
        </main>
      )}
    </>
  );
}
