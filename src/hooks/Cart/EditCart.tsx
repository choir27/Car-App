import api from "../../api/api";
import { toast } from "react-toastify";
import { CartItem } from "../../middleware/Interfaces/Cart";
import { cacheEmail } from "../../middleware/Cache";

//When user changes quantity of item in the cart
export async function EditCart(item: CartItem) {
  try {
    const cartItem = {
      itemID: item.$id,
      category: item.category,
      description: item.description,
      manufacturer: item.manufacturer,
      name: item.name,
      price: item.price,
      email: cacheEmail,
      quantity: item.quantity,
    };

    await api.updateDocument(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_CART_COLLECTION_ID,
      item.$id,
      cartItem,
    );

    window.location.reload();
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
