import api from "../../api/api";
import { toast } from "react-toastify";
import { Login } from "../../middleware/Interfaces/Auth";
import { SetCacheEmail } from "../../middleware/Cache";

export async function handleLogin(props: Login): Promise<void> {
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

    await api.createSession(props.email, props.password);
    const response = await api.getAccount();
    if (response) {
      console.log(response);
      SetCacheEmail(props.email);
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
