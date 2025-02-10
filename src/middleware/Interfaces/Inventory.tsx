import { CartItem } from "./Cart";

export interface InventoryItem {
  $id?: string;
  name: string;
  category: string;
  quantity: number;
  manufacturer: string;
  reOrderLV: string;
  price: string;
  description: string;
}

export interface Item {
  inventory: InventoryItem;
  itemQuantity: number | undefined;
}

export interface DefaultInventoryDisplay {
  startIndex: number,
  endIndex: number,
  setItemQuantity: (e: number) => void;
  inventory: InventoryItem[];
  itemQuantity: number | undefined;
}

export interface InventoryQuantity {
  itemName: string;
  cart: CartItem[];
  setItemQuantity: (e: number) => void;
  quantity: number;
}

export interface DisplayCurrentInventory {
  inventory: InventoryItem[];
  cart: CartItem[];
  setItemQuantity: (e: number) => void;
  quantity: number | undefined;
}

export interface DisplayInventory {
  pricePerUnit: number;
  itemName: string;
  manufacturer: string;
  description: string;
  reorderLevel: string;
  category: string;
}
