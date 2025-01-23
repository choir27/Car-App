import { InventoryItem } from "../../middleware/Interfaces/Inventory"
import {renderCartQuantity} from "../../middleware/Interfaces/Cart";

//render select element with option elements from 1 to quantity value
export function RenderCartQuantity(props: renderCartQuantity) {
  const cartQuantity = [];

  //find item in inventory database
  const findItem = props?.inventory.filter(
    (item: InventoryItem) => item.name === props.name,
  );

  for (let i = 1; i <= findItem[0]?.quantity; i++) {
    cartQuantity.push(<option key={`k-${i}`}>{i}</option>);
  }

  if (props.quantity) {
    return (
      <select
        defaultValue={
          props.cartItemQuantity ? props.cartItemQuantity : props.quantity
        }
        onChange={(e) => props.setCartItemQuantity(e.target.value)}
      >
        {cartQuantity}
      </select>
    );
  }
}
