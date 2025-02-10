import { useState, useContext } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { DefaultInventory } from "../../hooks/Inventory/DefaultInventory";
import { APIContext } from "../../middleware/Context";
import "./shop.css";
import { DarkModeContext } from "../../middleware/Context";

export default function InventoryShop() {
  const [itemQuantity, setItemQuantity] = useState<number>();

  const { inventory } = useContext(APIContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <main id="inventory">
      <Nav pageHeading={"Inventory Shop"} />

      <div className="flex justifyCenter"></div>

      <table className="w-full">
        <thead className={`${toggleDarkMode === "dark" ? "lightBtn" : "dark-btn"}`}>
          <td className="text-3xl p-2">Item</td>
          <td className="text-3xl p-2">Price</td>
          <td className="text-3xl p-2">Quantity</td>
          <td></td>
          <td></td>
        </thead>
        {DefaultInventory({
          itemQuantity: itemQuantity,
          setItemQuantity: (e: number) => setItemQuantity(e),
          inventory: inventory,
        })}
      </table>
      <Footer />
    </main>
  );
}
