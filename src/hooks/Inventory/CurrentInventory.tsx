import { Button } from "../../components/Button";
import { handleAddToCart } from "../Cart/HandleAddToCart";
import {
  InventoryItem,
  DisplayCurrentInventory,
} from "../../middleware/Interfaces/Inventory";
import {CartItem} from "../../middleware/Interfaces/Cart"
import { renderInventoryQuantityOptions } from "../Inventory/RenderInventoryQuantityOptions";
import { useContext } from "react";
import {  DarkModeContext } from "../../middleware/Context";

//Render the current inventory avaiable, checking for duplicates in the cart
export function CurrentInventory(props: DisplayCurrentInventory) {
  const {toggleDarkMode} = useContext(DarkModeContext);

  const itemQuantity: { [key: string]: number } = {};

  props.cart.forEach((item: CartItem) => (itemQuantity[item.name] = 0));
  props.cart.forEach((item: CartItem) => itemQuantity[item.name]++);

  const cartQuantity: { [key: string]: number } = {};

  props.cart.forEach((item: CartItem) => (cartQuantity[item.name] = 0));

  return props.inventory.map((inventoryItems: InventoryItem) => {
    const findItemInCart = props.cart.filter(
      (item: CartItem) => item.name === inventoryItems.name,
    );

    let sum = 0;
    findItemInCart.forEach(
      (item: CartItem) => (sum += parseInt(item.quantity)),
    );

    const quantityTotal = findItemInCart.length
      ? inventoryItems.quantity - sum
      : inventoryItems.quantity;

    return (
      <section
        key={inventoryItems.$id}
        className={`m-2 p-2 border-radius-10px ${toggleDarkMode === "dark" ? "lightBtn shadow-2xs" : "darkNav shadow-2xs"}`}
      >
        <h2 className="mb-1">{inventoryItems.name}</h2>
        <h2 className="mb-1">Quantity: {quantityTotal}</h2>
        <h2 className="mb-1">${inventoryItems.price}</h2>
        <div className="flex flex-col item-center">
        {quantityTotal
          ? renderInventoryQuantityOptions({
              itemName: inventoryItems.name,
              cart: props.cart,
              setItemQuantity: (e:number) => props.setItemQuantity(e),
              quantity: inventoryItems.quantity,
            })
          : ""}
        {quantityTotal
          ? Button({
              classNames: `${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`,
              text: "Add To Cart",
              handleButtonClick: () => {
                handleAddToCart({
                  cart: props.cart,
                  $id: inventoryItems.$id,
                  inventory: props.inventory,
                  quantity: props.quantity,
                });
              },
            })
          : ""}
          </div>
      </section>
    );
  });
}
