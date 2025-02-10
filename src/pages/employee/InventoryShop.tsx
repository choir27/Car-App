import { useState, useContext } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { DefaultInventory } from "../../hooks/Inventory/DefaultInventory";
import { APIContext } from "../../middleware/Context";
import "./shop.css";
import { DarkModeContext } from "../../middleware/Context";
import PaginatedButtons from "../../components/Graphs/PaginatedButtons";
import { items } from "../../api/inventory";

export default function InventoryShop() {
  const [itemQuantity, setItemQuantity] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);

  const { inventory } = useContext(APIContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  const rowsPerPage = 5;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <main id="inventory">
      <Nav pageHeading={"Inventory Shop"} />

      <section
        className={`mx-2 flex flex-col items-start justify-around bg-white p-4 shadow-2xs ${
          toggleDarkMode === "dark" ? "light" : "dark"
        }`}
      >
        <table className="w-full">
          <thead
            className={`${toggleDarkMode === "dark" ? "lightBtn" : "dark-btn"}`}
          >
            <td className="text-3xl p-2">Item</td>
            <td className="text-3xl p-2">Price</td>
            <td className="text-3xl p-2">Quantity</td>
            <td></td>
            <td></td>
          </thead>
          {DefaultInventory({
            startIndex,
            endIndex,
            itemQuantity: itemQuantity,
            setItemQuantity: (e: number) => setItemQuantity(e),
            inventory: inventory,
          })}
        </table>

        <PaginatedButtons
          className="flex"
          currentPage={currentPage}
          cartLength={items.length}
          setCurrentPage={(e: number) => setCurrentPage(e)}
          rowsPerPage={rowsPerPage}
        />
      </section>

      <Footer />
    </main>
  );
}
