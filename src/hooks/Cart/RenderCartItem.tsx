import { Button } from "../../components/Button";
import { RenderCartQuantity, EditCart, handleDeleteCartItem } from "../hooks/CartHooks";
import { CartItem, Cart } from "../../middleware/Interfaces/Cart";

export default function RenderCartItem({
  i,
  item,
  props,
  checkCartQuantity,
  itemPriceTotal,
}: {
  i: number;
  item: CartItem;
  props: Cart;
  checkCartQuantity: string;
  itemPriceTotal: number;
}) {
  return (
    <section className="flex flex-col alignCenter" key={i}>
      <div className="flex justifyBetween alignCenter">
        <div className="flex alignCenter">
          <h2>{item.name}</h2>
          <i
            className="fa-solid fa-xmark button"
            onClick={() => handleDeleteCartItem(item.$id)}
          ></i>
        </div>

        <h2>
          Quantity:{" "}
          {RenderCartQuantity({
            name: item.name,
            quantity: item.quantity,
            inventory: props.inventory,
            cartItemQuantity: props.cartItemQuantity,
            setCartItemQuantity: (e: string) => props.setCartItemQuantity(e),
          })}
          {Button({
            text: "Update",
            handleButtonClick: () =>
              EditCart({
                name: item.name,
                price: item.price,
                email: item.email,
                quantity: checkCartQuantity,
                manufacturer: item.manufacturer,
                description: item.description,
                category: item.category,
                $id: item.$id,
                itemID: item.itemID,
              }),
          })}
        </h2>

        <h2>
          $
          {parseInt(item?.quantity) > 1
            ? itemPriceTotal.toFixed(2)
            : item.price}
        </h2>
      </div>
    </section>
  );
}
