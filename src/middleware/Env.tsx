import React from "react";

//globally accessible env variables
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      REACT_APP_COLLECTION_ID: string;
      REACT_APP_DATABASE_ID: string;
      REACT_APP_PROJECT: string;
      REACT_APP_CAR_API_KEY: string;
      REACT_APP_ENDPOINT: string;
      REACT_APP_INVENTORY_COLLECTION_ID: string;
      REACT_APP_CART_COLLECTION_ID: string;
      REACT_APP_PURCHASES_COLLECTION_ID: string;
      REACT_APP_CART_DATABASE_ID: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}
