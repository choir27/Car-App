import {
  PurchasedItem,
} from "../../middleware/Interfaces";
import { cacheEmail } from "../../middleware/Cache";

export function RenderEmployeeProfit(purchases: PurchasedItem[]) {
  let cartTotal = 0;

  purchases.forEach((cart: PurchasedItem) => {
    for (let i = 0; i < cart.cartItems.length; i++) {
      const cartItem: PurchasedItem = JSON.parse(cart.cartItems[i]);

      if (cartItem.email === cacheEmail) {
        const itemTotal = Number(cartItem.price) * parseInt(cartItem.quantity);

        cartTotal += itemTotal;
      }
    }
  });

  return cartTotal.toFixed(2);
}
