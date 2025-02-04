import { useState, useContext } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { CurrentInventory } from "../../hooks/Inventory/CurrentInventory";
import { APIContext, DarkModeContext } from "../../middleware/Context";

export default function Inventory() {
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  
  const { inventory, cart } = useContext(APIContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <main id="inventory">
      <Nav pageHeading={"Current Inventory"} />
      <section className="itemContainer flex">
        {CurrentInventory({
          cart: cart,
          inventory: inventory,
          setItemQuantity: (e: number) => setItemQuantity(e),
          quantity: itemQuantity,
        })}
      </section>
      <Footer />
    </main>
  );
}
