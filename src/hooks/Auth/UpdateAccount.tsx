import axios from "axios";
import api from "../../api/api";
import { toast } from "react-toastify";
import { SetCacheEmail } from "../../middleware/Cache";

export async function updateAccountName(name: string) {
  try {
    const updatedName = await api.updateAccountName(name);
    if (updatedName) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export async function updateAccountPassword(
  password: string,
  oldPassword: string,
) {
  try {
    const updatedPassword = await api.updateAccountPassword(
      password,
      oldPassword,
    );
    if (updatedPassword) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export async function updateAccountEmail(email: string, password: string) {
  try {
    const updatedEmail = await api.updateAccountEmail(email, password);
    if (updatedEmail) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export async function handleDeleteAccount(userId: string) {
  try {
    await api.deleteSessions();
    SetCacheEmail("");
    await axios.delete(
      `https://car-app-backend-0ejb.onrender.com/deleteUser/${userId}`,
    );
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
}
