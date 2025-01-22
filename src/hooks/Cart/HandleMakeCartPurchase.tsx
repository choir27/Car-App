import api from "../../api/api";
import { Permission, Role } from "appwrite";
import { toast } from "react-toastify";
import {
  CartItem,
  CartPurchase,
  InventoryItem,
} from "../../middleware/Interfaces";

//When the user sells the items in the cart
export async function handleMakeCartPurchase(props: CartPurchase) {
    try {
      if (props.cart && props.cardInfo?.cardNumber) {
        //returns an array that converts all objects within the cart as a string
        const cartAsString = props.cart.map((item: CartItem) =>
          JSON.stringify(item),
        );
  
        const cartItems = {
          cartItems: cartAsString,
        };
  
        //go through each item in cart and each item in the inventory, and if they match names (because there are no duplicate items in the inventory), update that inventory items' quantity based on the purchase made from the cart
        props.inventory.forEach(async (inventoryItem: InventoryItem) => {
          for (let i = 0; i < props.cart.length; i++) {
            if (props.cart[i].name === inventoryItem.name) {
              const quantity =
                Number(inventoryItem.quantity) - Number(props.cart[i].quantity);
              const inventoryID = inventoryItem.$id;
  
              const cartItem = {
                quantity: quantity,
              };
  
              const data = await api.updateDocument(
                import.meta.env.VITE_REACT_APP_DATABASE_ID,
                import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID,
                inventoryID,
                cartItem,
              );
  
              //Upon purchase, if an items' quantity reaches the reOrderLV, or is below the reOrderLV value, update the appropriate cart items' quantity
              // if(inventoryItem.reOrderLV >= quantity){
  
              //     const updateCartItem = {
              //         name: inventoryItem.name,
              //         price: inventoryItem.price,
              //         manufacturer: inventoryItem.manufacturer,
              //         description: inventoryItem.description,
              //         category: inventoryItem.category,
              //         quantity: quantity + inventoryItem.reOrderLV
              //     }
  
              //     await api.updateDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID, inventoryID, updateCartItem)
              // }
            }
          }
        });
  
        const data = await api.createDocument(
          import.meta.env.VITE_REACT_APP_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_PURCHASES_COLLECTION_ID,
          cartItems,
          [Permission.read(Role.any())],
        );
  
        // remove all currently purchased items from the cart database
        for (let i = 0; i < props.cart.length; i++) {
          await api.deleteDocument(
            import.meta.env.VITE_REACT_APP_DATABASE_ID,
            import.meta.env.VITE_REACT_APP_CART_COLLECTION_ID,
            props.cart[i].$id,
          );
        }
  
        if (data) {
          window.location.reload();
        }
      } else {
        toast.error(
          "An error has occured, please ensure that all fields are filled out before continuing.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
    }
  }
  