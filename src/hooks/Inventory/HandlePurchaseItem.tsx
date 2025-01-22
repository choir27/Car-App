import api from "../../api/api";
import { Permission, Role } from "appwrite";
import {
  InventoryItem,
  Item,
} from "../../middleware/Interfaces";

//when the user adds an item from the store to add to the inventory
export async function HandlePurchaseItem(props: Item) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID,
    );

    const checkForDuplicates = await data.documents.filter(
      (inventory: InventoryItem) => inventory.name === props.inventory.name,
    );

    //check for duplicates in the inventory database
    if (!checkForDuplicates.length) {
      const item = {
        name: props.inventory.name,
        price: props.inventory.price,
        manufacturer: props.inventory.manufacturer,
        description: props.inventory.description,
        reOrderLV: props.inventory.reOrderLV,
        category: props.inventory.category,
        quantity: props.itemQuantity
          ? props.itemQuantity
          : props.inventory.quantity,
      };

      console.log(item)

      //create a new inventory object if no duplicate exists
      await api.createDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID,
        item,
        [Permission.read(Role.any())],
      );

      window.location.reload();
    } else {
      let quantity = 0;

      //checks if user changes the quantity of the item using the select input
      if (props.itemQuantity) {
        //adds the selected value from the select input to the current existing quantity in the inventory
        quantity = checkForDuplicates[0].quantity += props.itemQuantity;
      } else {
        //adds 1 to the current existing quantity in the inventory
        quantity = checkForDuplicates[0].quantity += 1;
      }

      const item = {
        name: props.inventory.name,
        price: props.inventory.price,
        manufacturer: props.inventory.manufacturer,
        description: props.inventory.description,
        reOrderLV: props.inventory.reOrderLV,
        category: props.inventory.category,
        quantity: quantity,
      };

      //updates the quantity of the item in the inventory
      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID,
        checkForDuplicates[0].$id,
        item,
      );

      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
}