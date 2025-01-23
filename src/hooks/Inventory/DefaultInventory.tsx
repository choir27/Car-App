import { items } from "../../api/inventory";
import { Button } from "../../components/Button";
import {
  InventoryItem,
  DefaultInventoryDisplay,
} from "../../middleware/Interfaces";
import { HandlePurchaseItem } from "../Inventory/HandlePurchaseItem";
import { renderQuantityOptions } from "../Inventory/RenderQuantityOptions";

//Render the store for purchase to add items to inventory
export function DefaultInventory(props: DefaultInventoryDisplay) {
  //iterate through static data in api/inventory
  return items.map((inventoryItem: any, i: number) => {
    //find item in static data currently in inventory database
    const findItem: InventoryItem[] = props.inventory.filter(
      (value: InventoryItem) => value.name === inventoryItem.itemName,
    );

    let price = inventoryItem.pricePerUnit.toString();

    //modify format of price in static database so it resembles a dollar value
    if (inventoryItem.pricePerUnit.toString().includes(".")) {
      const cents = inventoryItem.pricePerUnit.toString().split(".")[1];
      if (parseInt(cents) < 10) {
        price += "0";
      }
    } else {
      price += ".00";
    }

    const itemName = inventoryItem.itemName;
    const itemManufacturer = inventoryItem.manufacturer;
    const itemDescription = inventoryItem.description;
    const itemReorderLV = inventoryItem.reorderLevel;
    const itemCategory = inventoryItem.category;
    const quantity = 1;

    return (
      <section key={i} className="flex flex-col item">
        <div className="flex justifyBetween itemHeading">
          <h2>{itemName}</h2>
          <h3>${price}</h3>
        </div>
        <h3>Quantity: {findItem[0]?.quantity ? findItem[0]?.quantity : 0}</h3>
        <p>{itemDescription}</p>
        {renderQuantityOptions((e: number) => props.setItemQuantity(e))}
        {Button({
          text: "Purchase Item",
          handleButtonClick: () => {
            HandlePurchaseItem({
              itemQuantity: props.itemQuantity,
              inventory: {
                name: itemName,
                category: itemCategory,
                quantity: quantity,
                manufacturer: itemManufacturer,
                reOrderLV: itemReorderLV,
                price: price,
                description: itemDescription,
              },
            });
          },
        })}
      </section>
    );
  });
}
