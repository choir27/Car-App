import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useState, useContext, useEffect } from "react";
import { ButtonSubmit, Button } from "../../components/Button";
import {
  GenerateNewEmployee,
  handleLogin,
  handleSignUp,
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
import { User } from "../../middleware/Interfaces/Auth";
import { GetUsers } from "../../hooks/hooks/ApiCalls";

export function EmployeeHub() {
  const { user, purchases, employee } = useContext(APIContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  const [listOfUsers, setListOfUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showPurchases, setShowPurchases] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const rowsPerPage = 3;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const rows = 2;

  useEffect(() => {
    GetUsers(
      (e: User[]) => setListOfUsers(e),
      (e: boolean) => setLoading(e),
    );
  }, [listOfUsers]);

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
              {Input({
                type: "email",
                name: "email",
                onChange: (e) => setEmail(e),
                placeholder: "Your Email",
                className: "mb-4",
              })}
              {Input({
                type: "text",
                name: "name",
                onChange: (e) => setName(e),
                placeholder: "Your Full Name",
                className: "mb-4",
              })}
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
                className: `mt-2 ${
                  toggleDarkMode === "light" ? "lightBtn" : "darkBtn"
                }`,
              })}
            </form>
          </section>
        )}

        {user.$id ? (
          user?.$id === "678ac48e001184a52497" ||
          user?.$id === "64e51b2e84f09ed015ec" ? (
            <section className="admin flex justifyCenter alignCenter">
              <section className="flex flex-col alignCenter leftContainer">
                <h3 className="textAlignCenter">Admin Hub</h3>

                <form className="flex flex-col alignCenter">
                  {Input({
                    type: "email",
                    name: "email",
                    onChange: (e) => setEmail(e),
                    placeholder: "Employees Email",
                  })}
                  {Input({
                    type: "text",
                    name: "text",
                    onChange: (e) => setName(e),
                    placeholder: "Employees Name",
                  })}
                  {Input({
                    type: "text",
                    name: "password",
                    value: generatedPassword,
                    disabled: true,
                    onChange: (e) => setPassword(e),
                    placeholder: "Employees Password",
                  })}

                  {generatedPassword
                    ? ""
                    : Button({
                        text: "Automate Password for New Employee Account",
                        handleButtonClick: () => {
                          GenerateNewEmployee(
                            (e: string) => setPassword(e),
                            (e: string) => setGeneratedPassword(e),
                          );
                        },
                      })}

                  {ButtonSubmit({
                    handleButtonClick: () =>
                      handleSignUp({
                        email: email,
                        name: name,
                        password: password,
                      }),
                    text: "Create Employee Sign Up",
                  })}
                </form>
              </section>
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
                      classNames: `mb-2 ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`,
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
                        classNames: `align-end w-full ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`
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
