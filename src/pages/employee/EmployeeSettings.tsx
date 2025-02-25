import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import React, { useState, useContext } from "react";
import { Button } from "../../components/Button";
import {
  updateAccountEmail,
  handleDeleteAccount,
  updateAccountName,
  updateAccountPassword,
} from "../../hooks/hooks/AuthHooks";
import { Input } from "../../hooks/Inputs/GeneralInput";
import { APIContext, DarkModeContext } from "../../middleware/Context";

export default function EmployeeSettings(): React.JSX.Element {
  const { user } = useContext(APIContext);

  const [email, setEmail] = useState<string>("");
  const [displayDelete, setDisplayDelete] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const {toggleDarkMode} = useContext(DarkModeContext);

  return (
    <main id="employeeSettings">
      <Nav pageHeading={"Settings"} />
        <form className={`mx-2 p-4 shadow-2xs flex flex-col items-center" ${
          toggleDarkMode === "dark" ? "light" : "dark"}`}>
          <section className="flex flex-col items-center mb-4">
            <h2 className="mb-2">Update Your Account Name</h2>
            {Input({
              className:"mb-2",
              type: "text",
              name: "text",
              onChange: (e) => setName(e),
              placeholder: user?.name,
            })}
            {Button({
              text: "Update User's Name",
              handleButtonClick: () => updateAccountName(name),
            })}
          </section>

          
          <section className="flex flex-col items-center mb-4">
          <h2 className="mb-2">Update Your Account Email</h2>
            {Input({
              type: "email",
              name: "email",
              className: "mb-2",
              onChange: (e) => setEmail(e),
              placeholder: user?.email,
            })}
            {Input({
              type: "password",
              name: "password",
              className: "mb-2",
              onChange: (e) => setPassword(e),
              placeholder: "Type your password here",
            })}
            {Button({
              text: "Update User's Email",
              handleButtonClick: () => updateAccountEmail(email, password),
            })}
          </section>

          <section className="flex flex-col items-center mb-4">
          <h2 className="mb-2">Update Your Account Password</h2>
            {Input({
              className: "mb-2",
              type: "password",
              name: "password",
              onChange: (e) => setOldPassword(e),
              placeholder: "Old Password Here",
            })}
            {Input({
              className: "mb-2",
              type: "password",
              name: "password",
              onChange: (e) => setPassword(e),
              placeholder: "New Password Here",
            })}
            {Button({
              text: "Update User's Password",
              handleButtonClick: () =>
                updateAccountPassword(password, oldPassword),
            })}
          </section>

          {user?.email !== "helena24@gmail.com" &&
          user?.email !== "bobTheBuilder@gmail.com" ? (
            <section className="flex flex-col items-center">
                <h2 className="mb-2">Delete your Account</h2>

              {Button({
                text: "Delete User's Account",
                handleButtonClick: () => setDisplayDelete(!displayDelete),
              })}

              <div
                className={`${
                  displayDelete ? "show" : "hidden"
                } clearButton deleteAccount flex flex-col`}
              >
                <div className="flex justifyCenter">
                  <h3>Are you sure you want to delete your account?</h3>
                  <i
                    className="fa-solid fa-xmark button"
                    onClick={() => setDisplayDelete(!displayDelete)}
                  ></i>
                </div>

                <div className="flex justifyAround">
                  {Button({
                    classNames: "deleteButton",
                    text: "Delete Account",
                    handleButtonClick: () => handleDeleteAccount(user.$id),
                  })}
                  {Button({
                    text: "Go Back",
                    handleButtonClick: () => setDisplayDelete(!displayDelete),
                  })}
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
        </form>

      <Footer />
    </main>
  );
}
