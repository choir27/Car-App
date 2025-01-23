import api from "../../api/api";
import { toast } from "react-toastify";

//when the user removes an item from the cart
export async function handleDeleteCartItem(cartID: string) {
  try {
    const data = await api.deleteDocument(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_CART_COLLECTION_ID,
      cartID,
    );

    if (data) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
