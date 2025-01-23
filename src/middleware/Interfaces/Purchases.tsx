export interface PurchasedItem {
  $createdAt: string;
  $id: string;
  name: string;
  price: string;
  quantity: string;
  cartItems: string[];
  email?: string;
}

export interface DisplayBy {
  purchases: PurchasedItem[];
  startIndex: number;
  endIndex: number;
  currentPage: number;
  setCurrentPage: (e: number) => void;
  rowsPerPage: number;
}

export interface GraphLabels {
  quantities: number[];
  profits: any[];
  dates: any[];
  cartLength: number;
  currentPage: number;
  setCurrentPage: (e: number) => void;
  rowsPerPage: number;
  startIndex: number;
  endIndex: number;
  setLimit: (e: number) => void;
  limit: number;
  length: number;
}

export interface ListLabels {
  currentPage: number;
  setCurrentPage: (e: number) => void;
  rowsPerPage: number;
  startIndex: number;
  endIndex: number;
}
