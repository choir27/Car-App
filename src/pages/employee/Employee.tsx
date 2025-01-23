import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useState, useContext, useEffect } from "react";
import { ButtonSubmit, Button } from "../../components/Button";
import {
  GenerateNewEmployee,
  handleLogin,
  handleSignUp,
} from "../../hooks/LoginHooks";
import { Input } from "../../hooks/Inputs/GeneralInput";
import { EmployeeButtons } from "../../hooks/Employee/EmployeeButtons";
import { RenderEmployeeAppointments } from "../../hooks/Employee/RenderEmployeeAppointments";
import { RenderEmployeeProfit } from "../../hooks/Employee/RenderEmployeeProfit";
import PaginatedButtons from "../../components/Graphs/PaginatedButtons";
import { toggleDisplay } from "../../hooks/ToggleDisplay";
import { cacheEmail } from "../../middleware/Cache";
import { APIContext } from "../../middleware/Context";
import { User } from "../../middleware/Interfaces";
import { GetUsers } from "../../hooks/ApiCalls";

export function EmployeeHub() {
  const { user, purchases, employee } = useContext(APIContext);

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

      <section className="flex flex-col alignCenter justifyBetween">
        {user.$id ? (
          ""
        ) : (
          <form className="flex flex-col alignCenter">
            {Input({
              type: "email",
              name: "email",
              onChange: (e) => setEmail(e),
              placeholder: "Your Email",
            })}
            {Input({
              type: "text",
              name: "name",
              onChange: (e) => setName(e),
              placeholder: "Your Full Name",
            })}
            {Input({
              type: "password",
              name: "password",
              onChange: (e) => setPassword(e),
              placeholder: "Your Password",
            })}

            {ButtonSubmit({
              handleButtonClick: () =>
                handleLogin({ email: email, name: name, password: password }),
              text: "Login",
            })}
          </form>
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
            <section className="flex flex-col">
              <h2 className="flex justifyCenter heading">Employee Hub</h2>

              <section className="flex justifyBetween alignCenter employee">
                <section className="flex flex-col profile">
                  <h2 className="email">Email: {user.email}</h2>
                  <h2>Start Date: {user.$createdAt.split("T")[0]}</h2>
                  <h2>Total Sales Made: ${RenderEmployeeProfit(purchases)}</h2>
                </section>

                {showPurchases ? (
                  ""
                ) : (
                  <section className="flex flex-col alignCenter justifyBetween buttons">
                    {Button({
                      text: "Sales History Hub",
                      handleButtonClick: () =>
                        toggleDisplay(
                          (e: boolean) => setShowPurchases(e),
                          showPurchases,
                        ),
                    })}
                  </section>
                )}

                {showPurchases ? (
                  <section className="flex flex-col alignCenter purchases">
                    <PaginatedButtons
                      className={"flex"}
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

                    {Button({
                      text: "Hide Sales History Hub",
                      handleButtonClick: () =>
                        toggleDisplay(
                          (e: boolean) => setShowPurchases(e),
                          showPurchases,
                        ),
                    })}
                  </section>
                ) : (
                  ""
                )}
              </section>
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
