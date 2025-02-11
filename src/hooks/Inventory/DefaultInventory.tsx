import {useContext} from "react";
import { items } from "../../api/inventory";
import { Button } from "../../components/Button";
import {
  InventoryItem,
  DefaultInventoryDisplay,
} from "../../middleware/Interfaces/Inventory";
import { HandlePurchaseItem } from "../Inventory/HandlePurchaseItem";
import { renderQuantityOptions } from "../Inventory/RenderQuantityOptions";
import { DarkModeContext } from "../../middleware/Context";

//Render the store for purchase to add items to inventory
export function DefaultInventory(props: DefaultInventoryDisplay) {
  const { toggleDarkMode } = useContext(DarkModeContext);

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

    const lightMode = toggleDarkMode == "dark" ? "even-row" : "even-dark"
    const darkMode = toggleDarkMode == "dark" ? "lightBtn" : "dark-btn"

    return (
      <tr key={i} className={`${i % 2 === 0 ? lightMode : darkMode} w-full`}>
          <td className="p-2 text-2xl">{itemName}</td>
          <td className="p-2 text-2xl">${price}</td>
          <td className="p-2 text-2xl">Quantity: {findItem[0]?.quantity ? findItem[0]?.quantity : 0}</td>


        <td className="p-2">{renderQuantityOptions((e: number) => props.setItemQuantity(e))}</td>
        <td className="p-2">
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
        </td>
      </tr>
    );
  }).slice(props.startIndex, props.endIndex);
}
