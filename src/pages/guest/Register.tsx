import Nav from "../../components/Nav";
import { handleSignUp } from "../../hooks/hooks/AuthHooks";
import { Input } from "../../hooks/hooks/InputHooks";
import { ButtonSubmit } from "../../components/Button";
import Footer from "../../components/Footer";
import { DarkModeContext } from "../../middleware/Context";
import { useContext, useState } from "react";

export default function Demo() {
  const { toggleDarkMode } = useContext(DarkModeContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <main id="auth">
      <Nav pageHeading={"Register a new account"} />

<div className="flex flex-col items-center">
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
        
        <label className="my-1">Your Name</label>
          {Input({
            type: "text",
            name: "name",
            onChange: (e) => setName(e),
            placeholder: "Your Full Name",
            className: "mb-4",
          })}

          {ButtonSubmit({
            handleButtonClick: () =>
              handleSignUp({ email: email, name: name, password: password }),
            text: "Register",
            className: "mt-2",
          })}

          <p className=" my-2">Already have an account? <a className="text-white" href="/login">Login to your account here.</a></p>

        </form>
      </section>
      </div>
      <Footer />
    </main>
  );
}
