import { Button } from "../../components/Button";
import { handleMakeCartPurchase } from "./HandleMakeCartPurchase";
import { Cart } from "../../middleware/Interfaces";

export function CartItemCard({total, props}:{total: string, props: Cart}) {
  return (
    <div className="flex flex-col alignCenter" key="cartTotal">
      <div className="flex justifyCenter cartTotal" key={total}>
        <h2>Total: </h2> <h2>${total}</h2>
      </div>

      {Button({
        text: "Purchase Items",
        handleButtonClick: () =>
          handleMakeCartPurchase({
            inventory: props.inventory,
            cart: props.cart,
            cardInfo: props.cardInfo,
            total: total,
          }),
      })}
    </div>
  );
}
