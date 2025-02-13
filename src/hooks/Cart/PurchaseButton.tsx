import { Button } from "../../components/Button";
import { handleMakeCartPurchase } from "./HandleMakeCartPurchase";
import { Cart, CartItem } from "../../middleware/Interfaces/Cart";

export function PurchaseButton({ props }: { props: Cart }) {
  let total = "";
  let cartTotal: number = 0;
  let decimalTotal: number = 0;
  props.cart.forEach((item: CartItem, i: number) => {
          let itemPriceTotal = 0;
          itemPriceTotal = Number(item.price) * parseInt(item.quantity);
    
          cartTotal += parseInt(itemPriceTotal.toString().split(".")[0]);
    
          if (itemPriceTotal.toString().includes(".")) {
            decimalTotal += parseInt(
              itemPriceTotal.toFixed(2).toString().split(".")[1],
            );
          }
    
          if (i === props.cart.length - 1) {
            let decimalNumbers = decimalTotal.toString().split("");
    
            if (decimalNumbers.length > 2) {
              const remainder: string = decimalNumbers.shift() as string;
              cartTotal += parseInt(remainder);
            }
    
            const decimals = decimalNumbers.join("");
    
            total = cartTotal.toString();
            total += "." + decimals;
          }

          total = Number(total).toFixed(2);
     });

  return (
    <>
      {Button({
        classNames: "mt-2",
        text: "Purchase Items",
        handleButtonClick: () =>
          handleMakeCartPurchase({
            inventory: props.inventory,
            cart: props.cart,
            cardInfo: props.cardInfo,
            total: total,
          }),
      })}
    </>
  );
}
