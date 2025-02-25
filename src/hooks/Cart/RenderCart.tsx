import React from "react";
import { CartItem, Cart } from "../../middleware/Interfaces/Cart";
import { RenderCartItem, CartItemCard } from "../hooks/CartHooks";

//render cart, cart total, item totals, and item quantities
export function RenderCart(props: Cart) {

  const totalOfCart: React.JSX.Element[] = [];

  let total = "";
  let cartTotal: number = 0;
  let decimalTotal: number = 0;
  const userCart = props.cart
    .map((item: CartItem, i: number) => {
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

      const checkCartQuantity = props.cartItemQuantity
        ? props.cartItemQuantity
        : item.quantity;
      total = Number(total).toFixed(2);

      if (props.cart.length === 1) {
        totalOfCart.push(CartItemCard({ total, props }));

        return RenderCartItem({
          i,
          item,
          props,
          checkCartQuantity,
          itemPriceTotal,
        });
      } else if (props.cart.length > 1 && i !== props.cart.length - 1) {
        return RenderCartItem({
          i,
          item,
          props,
          checkCartQuantity,
          itemPriceTotal,
        });
      } else if (i === props.cart.length - 1) {
        totalOfCart.push(
          <div className="purchase-btn flex flex-col items-start w-full" key="cartTotal">
              <h2>Total: ${total}</h2>
          </div>,
        );

        return RenderCartItem({
          i,
          item,
          props,
          checkCartQuantity,
          itemPriceTotal,
        });
      }
    })
    .slice(props.startIndex, props.endIndex);

  if (userCart.length) {
    return [userCart, totalOfCart];
  } else {
    return (
      <section className="flex flex-col">
        <h2>No items in the cart currently</h2>
      </section>
    );
  }
}
