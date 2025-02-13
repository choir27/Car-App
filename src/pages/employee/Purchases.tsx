import { useState, useEffect, useContext } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import BarGraph from "../../components/Graphs/BarGraph";
import LineGraph from "../../components/Graphs/LineGraph";
import HorizontalBarGraph from "../../components/Graphs/HorizontalBarGraph";
import List from "../../components/Graphs/List";
import { GetPurchasedProfit, GetPurchasedQuantities,GetPurchasedDates } from "../../hooks/hooks/PurchasesHooks";
import { PurchasedItem } from "../../middleware/Interfaces/Purchases";
import { GetPurchases } from "../../hooks/hooks/ApiCalls";
import { DarkModeContext } from "../../middleware/Context";
import { FaChartBar, FaChartLine } from "react-icons/fa6";
import { FaRegChartBar, FaList } from "react-icons/fa";

export default function Purchases() {
  const [purchases, setPurchases] = useState<PurchasedItem[]>([]);
  const [purchaseList, setPurchaseList] = useState<PurchasedItem[]>([]);
  const [display, setDisplay] = useState<string>("bar");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);
  const rowsPerPage = 5;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const {toggleDarkMode} = useContext(DarkModeContext);

  useEffect(() => {
    GetPurchases((e: PurchasedItem[]) => setPurchases(e), limit);
  }, [limit]);

  useEffect(() => {
    GetPurchases((e: PurchasedItem[]) => setPurchaseList(e));
    if (purchaseList.length && purchases.length) {
      setLoading(true);
    }
  }, [purchaseList.length, purchases.length]);

  return (
    <main id="purchase">
      <Nav pageHeading={"Purchase History"} />
      {loading ? (
        <div className="flex items-center justify-center">
        <section className={`flex flex-col items-center mx-2 p-4 shadow-2xs ${toggleDarkMode === "dark" ? "light" : "dark"}`}>
          <section className="flex justify-center mb-2">
            <button onClick = {() => setDisplay("bar")}
              className = {`mr-2 button lightBtn ${display === "bar" ? "selectedPage" : ""}`}>
                <FaRegChartBar/>
            </button>
            <button onClick = {() => setDisplay("line")}
              className = {`mr-2 button lightBtn ${display === "line" ? "selectedPage" : ""}`}>
              <FaChartLine/>
            </button>
            <button onClick = {() => setDisplay("horizontalBar")}
              className = {`mr-2 button lightBtn ${display === "horizontalBar" ? "selectedPage" : ""}`}>
              <FaChartBar/>
              </button>
            <button onClick = {() => setDisplay("list")}
              className = {`button lightBtn ${display === "list" ? "selectedPage" : ""}`}>
              <FaList/>
            </button>
          </section>

          <section className="flex justify-center w-full">
            {display === "bar" ? (
              <BarGraph
                setLimit={(e: number) => setLimit(e)}
                limit={limit}
                length={purchaseList.length}
                cartLength={purchases.length}
                dates={GetPurchasedDates(purchases)}
                profits={GetPurchasedProfit(purchases)}
                quantities={GetPurchasedQuantities(purchases)}
                currentPage={currentPage}
                setCurrentPage={(e: number) => setCurrentPage(e)}
                rowsPerPage={rowsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            ) : (
              ""
            )}
          </section>

          <section className="flex justify-center w-full">
            {display === "line" ? (
              <LineGraph
                setLimit={(e: number) => setLimit(e)}
                limit={limit}
                cartLength={purchases.length}
                length={purchaseList.length}
                dates={GetPurchasedDates(purchases)}
                profits={GetPurchasedProfit(purchases)}
                quantities={GetPurchasedQuantities(purchases)}
                currentPage={currentPage}
                setCurrentPage={(e: number) => setCurrentPage(e)}
                rowsPerPage={rowsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            ) : (
              ""
            )}
          </section>

          <section className="flex justify-center w-full">
            {display === "horizontalBar" ? (
              <HorizontalBarGraph
                setLimit={(e: number) => setLimit(e)}
                limit={limit}
                length={purchaseList.length}
                dates={GetPurchasedDates(purchases)}
                quantities={GetPurchasedQuantities(purchases)}
                cartLength={purchases.length}
                profits={GetPurchasedProfit(purchases)}
                currentPage={currentPage}
                setCurrentPage={(e: number) => setCurrentPage(e)}
                rowsPerPage={rowsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            ) : (
              ""
            )}
          </section>

          <section className="flex justify-center w-full">
            {display === "list" ? (
              <List
                setCurrentPage={(e: number) => setCurrentPage(e)}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            ) : (
              ""
            )}
          </section>
        </section>
        </div>
      ) : (
        <h1 className="textAlignCenter">Loading...</h1>
      )}
      <Footer />
    </main>
  );
}
