import {
  PurchasedItem
} from "../../middleware/Interfaces";

//return array that returns a list of the date of the purchase
export function GetPurchasedDates(purchases: PurchasedItem[]) {
  return purchases.map((item: PurchasedItem) => {
    //total is here to have a variable to return as a string value
    let total = "";
    let cartTotal: number = 0;
    let decimalTotal: number = 0;
    for (let i = 0; i < item.cartItems.length; i++) {
      let quantityTotal = 0;
      const cartItem: PurchasedItem = JSON.parse(item.cartItems[i]);

      let itemPriceTotal = 0;
      itemPriceTotal = Number(cartItem.price) * parseInt(cartItem.quantity);

      //add the values left of the decimal point to the current cart total
      cartTotal += parseInt(itemPriceTotal.toString().split(".")[0]);

      //only if item total has a decimal point, add those decimals values to the decimal total
      if (itemPriceTotal.toString().includes(".")) {
        decimalTotal += parseInt(
          itemPriceTotal.toFixed(2).toString().split(".")[1],
        );
      }

      //on the last item of the cart, combine the values of the decimal total and the number total as a string
      if (i === item.cartItems.length - 1) {
        //Take decimal total and change it to a string
        let decimalNumbers = decimalTotal.toString().split("");

        //if the total of the decimal sum equals a value that supercedes the decimal place, add the number values left of the decimal place to the cart total
        if (decimalNumbers.length > 2) {
          const remainder: string = decimalNumbers.shift() as string;
          cartTotal += parseInt(remainder);
        }

        //combine the decimal number remainder and the current cart total, and comine them as one string
        const decimals = decimalNumbers.join("");
        total = cartTotal.toString();
        total += "." + decimals;
      }

      //convert current total as string and return it as a number
      const totalProfit = parseInt(total);

      quantityTotal += Number(cartItem.quantity);

      if (totalProfit) {
        return {
          date: cartItem.$createdAt.split("T")[0],
          quantityTotal,
          totalProfit,
        };
      }
    }
  });
}
