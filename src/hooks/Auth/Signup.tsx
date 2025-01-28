import { toast } from "react-toastify";
import { Client, Account, ID } from "appwrite";
import { SignUp } from "../../middleware/Interfaces/Auth";

export async function handleSignUp(props: SignUp): Promise<void> {
  try {
    if (!props.email) {
      toast.error("Please input an email address");
      return;
    } else if (!props.name) {
      toast.error("Please input your full name");
      return;
    } else if (!props.password) {
      toast.error("Please input a password");
      return;
    }

    const fullName = /^[A-Za-z\s]+$/;
    const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!fullName.test(props.name)) {
      toast.error("Please input a valid full name");
      return;
    } else if (!mail.test(props.email)) {
      toast.error("Please input a valid password");
      return;
    }

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject(import.meta.env.VITE_REACT_APP_PROJECT); // Your project ID

    const account = new Account(client);

    // Register User
    const createAccount = await account.create(
      ID.unique(),
      props.email,
      props.password,
      props.name,
    );

    if (createAccount) {
      window.location.reload();
    }
  } catch (err) {
    toast.error(`${err}`);
    console.error(err);
  }
}
