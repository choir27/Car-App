import { Button } from "../../components/Button";
import { handleAddToCart } from "../Cart/HandleAddToCart";
import {
  InventoryItem,
  DisplayCurrentInventory,
} from "../../middleware/Interfaces/Inventory";
import {CartItem} from "../../middleware/Interfaces/Cart"
import { renderInventoryQuantityOptions } from "../Inventory/RenderInventoryQuantityOptions";

//Render the current inventory avaiable, checking for duplicates in the cart
export function CurrentInventory(props: DisplayCurrentInventory) {
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
        className={"flex flex-col item borderSeperation"}
      >
        <h2>{inventoryItems.name}</h2>
        <h2>Quantity: {quantityTotal}</h2>
        <h2>${inventoryItems.price}</h2>
        <p>{inventoryItems.description}</p>
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
              classNames: "clearButton",
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
      </section>
    );
  });
}
