import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useState, useContext } from "react";
import { ButtonSubmit, Button } from "../../components/Button";
import {
  handleLogin,
} from "../../hooks/hooks/AuthHooks";
import { Input } from "../../hooks/hooks/InputHooks";
import {
  EmployeeButtons,
  RenderEmployeeAppointments,
  RenderEmployeeProfit,
} from "../../hooks/hooks/EmployeeHooks";
import PaginatedButtons from "../../components/Graphs/PaginatedButtons";
import { toggleDisplay } from "../../hooks/hooks/ToggleDisplay";
import { cacheEmail } from "../../middleware/Cache";
import { APIContext, DarkModeContext } from "../../middleware/Context";

export function EmployeeHub() {
  const { user, purchases } = useContext(APIContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showPurchases, setShowPurchases] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const rowsPerPage = 3;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <main id="auth">
      <Nav pageHeading={user ? `Welcome ${user.name}` : "Login"} />

      <section className="flex flex-col items-center">
        {user.$id ? (
          ""
        ) : (
          <section
            className={`h-36vh mx-2 p-6 flex flex-col shadow-2xs ${
              toggleDarkMode === "dark" ? "light" : "dark"
            }`}
          >
            <form className="flex flex-col items-center justify-between">
            <label className="my-1">Your Email</label>
              {Input({
                type: "email",
                name: "email",
                onChange: (e) => setEmail(e),
                placeholder: "Your Email",
                className: "mb-4",
              })}
                        
              <label className="my-1">Your Full Name</label>
              {Input({
                type: "text",
                name: "name",
                onChange: (e) => setName(e),
                placeholder: "Your Full Name",
                className: "mb-4",
              })}

              <label className="my-1">Your Password</label>
              {Input({
                type: "password",
                name: "password",
                onChange: (e) => setPassword(e),
                placeholder: "Your Password",
                className: "mb-4",
              })}

              {ButtonSubmit({
                handleButtonClick: () =>
                  handleLogin({ email: email, name: name, password: password }),
                text: "Login",
                className: "mt-2",
              })}

              <p className="my-2">Don't have an account? <a className="text-white" href="/register">Register a new account here.</a></p>
            </form>
          </section>
        )}

        {user.$id ? (
          user?.$id === "678ac48e001184a52497" ||
          user?.$id === "64e51b2e84f09ed015ec" ? (
            <section className={`mx-2 p-4 flex w-70 justify-around shadow-2xs ${toggleDarkMode === "dark" ? "light" : "dark"}`}>
            <div className="flex flex-col items-start justify-between w-full">
                <h2 className="flex justifyCenter heading">Admin Hub</h2>

                <div className="mt-6">
                <h2 className="mb-2">Email:</h2>
                <h3>{user.email}</h3>
                </div>

                <div className="mt-6">
                <h2 className="mb-2">Total Sales Made:</h2>
                <h3>${RenderEmployeeProfit(purchases)}</h3>
                </div>
               
            </div>

            {showPurchases ? (
                <section className="flex flex-col align-center w-full">
                  {Button({
                    classNames: "mb-2",
                    text: "Hide Sales History Hub",
                    handleButtonClick: () =>
                      toggleDisplay(
                        (e: boolean) => setShowPurchases(e),
                        showPurchases,
                      ),
                  })}

                  {RenderEmployeeAppointments(
                    purchases,
                    startIndex,
                    endIndex,
                  ).length ?
                  <PaginatedButtons
                    className={"flex mb-4"}
                    currentPage={currentPage}
                    cartLength={purchases.length}
                    setCurrentPage={(e: number) => setCurrentPage(e)}
                    rowsPerPage={rowsPerPage}
                  />: ""}

                  {RenderEmployeeAppointments(
                    purchases,
                    startIndex,
                    endIndex,
                  ).length ? RenderEmployeeAppointments(
                    purchases,
                    startIndex,
                    endIndex,
                  ) : <h2>No items could be found</h2>}
                </section>
              ) : (
                ""
              )}

              {showPurchases ? (
                ""
              ) : (
                <section className="w-full flex-col flex">
                  {Button({
                    text: "Show Sales History",
                    handleButtonClick: () =>
                      toggleDisplay(
                        (e: boolean) => setShowPurchases(e),
                        showPurchases,
                      ),
                      classNames: "align-end w-full"
                  })}
                </section>
              )}
          </section>
          ) : (
            <section className={`mx-2 p-4 flex w-70 justify-around shadow-2xs ${toggleDarkMode === "dark" ? "light" : "dark"}`}>
              <div className="flex flex-col items-start justify-between w-full">
                  <h2 className="flex justifyCenter heading">Employee Hub</h2>

                  <div className="mt-6">
                  <h2 className="mb-2">Email:</h2>
                  <h3>{user.email}</h3>
                  </div>

                  <div className="mt-6">
                  <h2 className="mb-2">Start Date:</h2>
                  <h3>{user.$createdAt.split("T")[0]}</h3>
                  </div>

                  <div className="mt-6">
                  <h2 className="mb-2">Total Sales Made:</h2>
                  <h3>${RenderEmployeeProfit(purchases)}</h3>
                  </div>
                 
              </div>

              {showPurchases ? (
                  <section className="flex flex-col align-center w-full">
                    {Button({
                      classNames: "mb-2",
                      text: "Hide Sales History Hub",
                      handleButtonClick: () =>
                        toggleDisplay(
                          (e: boolean) => setShowPurchases(e),
                          showPurchases,
                        ),
                    })}

                    <PaginatedButtons
                      className={"flex mb-4"}
                      currentPage={currentPage}
                      cartLength={purchases.length}
                      setCurrentPage={(e: number) => setCurrentPage(e)}
                      rowsPerPage={rowsPerPage}
                    />

                    {RenderEmployeeAppointments(
                      purchases,
                      startIndex,
                      endIndex,
                    )}
                  </section>
                ) : (
                  ""
                )}

                {showPurchases ? (
                  ""
                ) : (
                  <section className="w-full flex-col flex">
                    {Button({
                      text: "Show Sales History",
                      handleButtonClick: () =>
                        toggleDisplay(
                          (e: boolean) => setShowPurchases(e),
                          showPurchases,
                        ),
                        classNames: "align-end w-full"
                    })}
                  </section>
                )}
            </section>
          )
        ) : (
          ""
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function Employee() {
  return cacheEmail ? <EmployeeHub /> : <EmployeeButtons />;
}
