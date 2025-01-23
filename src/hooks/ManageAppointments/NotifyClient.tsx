import api from "../../api/api";
import axios from "axios";

export async function NotifyClient(
  email: string,
  service: string,
  year: string,
  model: string,
  make: string,
  estimateId?: string,
) {
  try {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("service", service);
    formData.append("carYear", year);
    formData.append("carModel", model);
    formData.append("carMake", make);

    await api.deleteDocument(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_COLLECTION_ID,
      estimateId,
    );

    const data = await axios.post(
      "https://car-app-backend-0ejb.onrender.com/sendEmail",
      formData,
      {},
    );

    if (data) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
}