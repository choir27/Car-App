import { CardInfo } from "./Interfaces/Cart";

export type State = {
  cardInfo: CardInfo;
};

export type Action = {
  setCardInfo: (e: CardInfo) => void;
};

export const defaultCardInfo = {
  cardNumber: 0,
  securityNumber: "",
  expirationDate: "",
  type: "",
};
