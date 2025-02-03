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
        <main id = 'hero' className="flex flex-col items-center justify-between">
          <Nav pageHeading="" />
          <section className="p-4 flex justify-between bg-white">

            <section className="w-60 flex flex-col items-start justify-between">
              <div>
              <h2 className="mb-4">Say Goodbye to Car Repair Hassles</h2>

              <p className="w-80 hero-paragraph">
                For over a century, dating back to 1892, we have been steadfast
                in providing exceptional service. We are determined to continue building on
                this legacy with your support.
              </p>
              </div>
              {cacheEmail
                ? ButtonLink({                    classNames: "mt-6",
                  domain: "/employee", text: "Employee Hub" })
                : ButtonLink({
                    classNames: "mt-6",
                    domain: "/reservation",
                    text: "Make Reservation",
                  })}
            </section>
                  
                  <div className="w-60">
                  <img src={Assets.whiteCar} alt="white car" className="maxw-full"/>
                  </div>

          </section>
          <Footer />
        </main>
      )}
    </>
  );
}
