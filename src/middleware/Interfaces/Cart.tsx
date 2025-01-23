import { InventoryItem } from "./Inventory";

export interface CartItem {
  $id: string;
  itemID: string;
  category: string;
  description: string;
  manufacturer: string;
  name: string;
  price: string;
  email: string;
  quantity: string;
}

export interface CardInfo {
  cardNumber: number;
  securityNumber: string;
  expirationDate: string;
  type: string;
}

export interface renderCartQuantity {
  name: string;
  quantity: string;
  inventory: InventoryItem[];
  cartItemQuantity: string | undefined;
  setCartItemQuantity: (e: string) => void;
}

export interface AddToCart {
  cart: CartItem[];
  $id: string | undefined;
  inventory: InventoryItem[];
  quantity: any;
}

export interface CartPurchase {
  inventory: InventoryItem[];
  cart: CartItem[];
  cardInfo: CardInfo | undefined;
  total: string;
}

export interface Cart {
  cart: CartItem[];
  inventory: InventoryItem[];
  cartItemQuantity: string | undefined;
  setCartItemQuantity: (e: string) => void;
  cardInfo: CardInfo | undefined;
  setCardInfo: (e: CardInfo) => void;
  startIndex: number;
  endIndex: number;
}
