import { useState, useContext } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { RenderPaymentForm, RenderCart } from "../../hooks/hooks/CartHooks";
import PaginatedButtons from "../../components/Graphs/PaginatedButtons";
import { CardInfo } from "../../middleware/Interfaces/Cart";
import { APIContext, DarkModeContext } from "../../middleware/Context";

export default function Cart() {
  const { cart, inventory } = useContext(APIContext);
  const [cartItemQuantity, setCartItemQuantity] = useState<string>();
  const [cardInfo, setCardInfo] = useState<CardInfo>();
  const [currentPage, setCurrentPage] = useState(1);
  const { toggleDarkMode } = useContext(DarkModeContext);

  const rowsPerPage = 2;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <main id="cart">
      <Nav pageHeading={"Cart"} />

      <section className={`flex flex-col items-start mx-2 p-4 shadow-2xs ${toggleDarkMode === "dark" ? "light" : "dark"}`}>

        <PaginatedButtons
          className={`flex flex-wrap`}
          currentPage={currentPage}
          cartLength={cart.length}
          setCurrentPage={(e: number) => setCurrentPage(e)}
          rowsPerPage={rowsPerPage}
        />


        <div className="flex w-full">
        <section className={`w-full items-start flex flex-col justifyCenter`}>
          {RenderCart({
            cart: cart,
            inventory: inventory,
            cartItemQuantity: cartItemQuantity,
            setCartItemQuantity: (e: string) => setCartItemQuantity(e),
            cardInfo: cardInfo,
            setCardInfo: (e: CardInfo) => setCardInfo(e),
            startIndex: startIndex,
            endIndex: endIndex,
          })}
        </section>

        {RenderPaymentForm({cardInfo, setCardInfo: (e: CardInfo) => setCardInfo(e), cart: {
            cart: cart,
            inventory: inventory,
            cartItemQuantity: cartItemQuantity,
            setCartItemQuantity: (e: string) => setCartItemQuantity(e),
            cardInfo: cardInfo,
            setCardInfo: (e: CardInfo) => setCardInfo(e),
            startIndex: startIndex,
            endIndex: endIndex,
          }})}
        </div>
      </section>

      <Footer />
    </main>
  );
}
