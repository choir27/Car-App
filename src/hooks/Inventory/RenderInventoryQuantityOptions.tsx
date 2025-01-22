import {
  CartItem,
  InventoryQuantity,
} from "../../middleware/Interfaces";

//render quantites of items in inventory
export function renderInventoryQuantityOptions(props: InventoryQuantity) {
  const options = [];

  //find inventory item in cart
  const findItemInCart = props.cart.filter(
    (item: CartItem) => item.name === props.itemName,
  );

  let sum = 0;
  findItemInCart.forEach((item: CartItem) => (sum += parseInt(item.quantity)));

  //if a duplicate item exists, change display of item quantity in inventory by subtracting the itme quantity in the cart
  if (findItemInCart.length) {
    props.quantity -= sum;
  }

  //render quantity numbers, accounting for undefined/zero values
  for (let i = 1; i <= props.quantity; i++) {
    if (!props.quantity) {
      options.push(
        <option key={`option-0`} value={0}>
          {0}
        </option>,
      );
    } else {
      options.push(
        <option key={`option-${i}`} value={i}>
          {i}
        </option>,
      );
    }
  }

  return (
    <select onChange={(e) => props.setItemQuantity(parseInt(e.target.value))}>
      {options}
    </select>
  );
}