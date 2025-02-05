import Nav from "../../components/Nav";
import { handleLogin } from "../../hooks/AuthHooks";
import { Input } from "../../hooks/InputHooks";
import { ButtonSubmit } from "../../components/Button";
import Footer from "../../components/Footer";
import { DarkModeContext } from "../../middleware/Context";
import { useContext } from "react";

export default function Demo() {
  const name = "Helena Blavatsky";
  const email = "helena24@gmail.com";
  const password = "dKiif87|5";
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <main id="auth">
      <Nav pageHeading={"Demo Account Login"} />
      <div className="flex flex-col items-center">
        <section
        className={`h-36vh mx-2 p-6 flex flex-col shadow-2xs ${
          toggleDarkMode === "dark" ? "light" : "dark"
        }`}
      >
        <form className="flex flex-col items-center justify-between">
          <label className="my-1">Demo Account Email</label>
          {Input({
            type: "email",
            onChange: (e: string) => e,
            name: "email",
            placeholder: email,
            disabled: true,
            className: "mb-4",
          })}

          <label className="my-1">Demo Account Name</label>
          {Input({
            type: "text",
            onChange: (e: string) => e,
            name: "name",
            placeholder: name,
            disabled: true,
            className: "mb-4",
          })}

          <label className="my-1">Demo Account Password</label>
          {Input({
            type: "password",
            onChange: (e: string) => e,
            name: "password",
            placeholder: password,
            disabled: true,
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
      </div>
      <Footer />
    </main>
  );
}
