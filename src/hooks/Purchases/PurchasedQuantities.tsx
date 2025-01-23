import { PurchasedItem } from "../../middleware/Interfaces";

//return array that returns a list of the total quantities of items sold per purchase
export function GetPurchasedQuantities(purchases: PurchasedItem[]) {
  return purchases.map((item: PurchasedItem) => {
    let quantityTotal = 0;
    for (let i = 0; i < item.cartItems.length; i++) {
      const cartItem: PurchasedItem = JSON.parse(item.cartItems[i]);
      quantityTotal += Number(cartItem.quantity);
    }
    return quantityTotal;
  });
}
