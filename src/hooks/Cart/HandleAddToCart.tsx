import api from "../../api/api";
import { Permission, Role } from "appwrite";
import { toast } from "react-toastify";
import {
  CartItem,
  AddToCart,
  InventoryItem,
} from "../../middleware/Interfaces";
import { cacheEmail } from "../../middleware/Cache";

//When user add an item to the cart
export async function handleAddToCart(props: AddToCart) {
  try {
    //find item in inventory database
    const findItem = props.inventory.filter(
      (item: InventoryItem) => item.$id === props.$id,
    );

    //find item in cart using item object in the findItem array && current logged in user
    const findCartItem = props.cart.filter(
      (cartItem: CartItem) =>
        cartItem.name === findItem[0].name && cartItem.email === cacheEmail,
    );

    //if there are no duplicates items currently in the cart using findCartItem
    if (!findCartItem.length) {
      const item = findItem[0];

      const cartItem = {
        itemID: item.$id,
        category: item.category,
        description: item.description,
        manufacturer: item.manufacturer,
        name: item.name,
        price: item.price,
        email: cacheEmail,
        quantity: props.quantity ? props.quantity : 1,
      };

      //create item and add it to the cart database
      await api.createDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_CART_COLLECTION_ID,
        cartItem,
        [Permission.read(Role.any())],
      );

      window.location.reload();
    } else {
      const item = findCartItem[0];

      //if there are duplicates items currently in the cart using findCartItem, add to the current existing quantity of respective item in the cart
      const cartItem = {
        itemID: item.$id,
        category: item.category,
        description: item.description,
        manufacturer: item.manufacturer,
        name: item.name,
        price: item.price,
        email: cacheEmail,
        quantity: props.quantity
          ? props.quantity + findCartItem[0].quantity
          : 1 + findCartItem[0].quantity,
      };

      //and update the current data for the respective item
      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_CART_COLLECTION_ID,
        item.$id,
        cartItem,
      );

      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
