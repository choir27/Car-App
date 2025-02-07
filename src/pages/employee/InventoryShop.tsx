import { useState, useContext } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { DefaultInventory } from "../../hooks/Inventory/DefaultInventory";
import { APIContext } from "../../middleware/Context";

export default function InventoryShop() {
  const [itemQuantity, setItemQuantity] = useState<number>();

  const { inventory } = useContext(APIContext);

  return (
    <main id="inventory">
      <Nav pageHeading={"Inventory Shop"} />

      <div className="flex justifyCenter"></div>

      <section className="grid">
        {DefaultInventory({
          itemQuantity: itemQuantity,
          setItemQuantity: (e: number) => setItemQuantity(e),
          inventory: inventory,
        })}
      </section>
      <Footer />
    </main>
  );
}
