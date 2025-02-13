import React from "react";
import { GetPurchases } from "../../hooks/hooks/ApiCalls";

export default function Query_Offset(
  itemLength: number,
  limit: number,
  setLimit: (e: number) => void,
) {
  const buttons = [];

  for (let i = 0; i < itemLength; i += 25) {
    if (i + 25 !== limit) {
      buttons.push(
        <button
          key={i}
          className="lightBtn button"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setLimit(i + 25);
            GetPurchases((e: any) => e, i + 25);
          }}
        >
          {i + 25}
        </button>,
      );
    } else {
      buttons.push(
        <button
          key={i}
          className="lightBtn button selectedPage"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setLimit(i + 25);
            GetPurchases((e: any) => e, i + 25);
          }}
        >
          {i + 25}
        </button>,
      );
    }
  }

  return (
    <section>
      <section className="flex flex-col items-start mt-2">
        <h2 className="mb-2">Configure Range of Items Displayed</h2>
        <section className="flex alignCenter">{buttons}</section>
      </section>
    </section>
  );
}
