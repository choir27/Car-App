import { useContext } from "react";
import PaginatedButtons from "../../components/Graphs/PaginatedButtons";
import { DisplayBy } from "../../middleware/Interfaces/Purchases";
import { DisplayDate } from "../../middleware/Interfaces/Reservation"
import { getYear } from "../Reservation/DatesStatic";
import { GetPurchasedDates } from "./PurchasedDates";
import { DarkModeContext } from "../../middleware/Context";

export function DisplayByYear(props: DisplayBy) {
  const {toggleDarkMode} = useContext(DarkModeContext);

  const currentYear = getYear();
  const purchasedDates = GetPurchasedDates(props.purchases);
  const filteredDates = purchasedDates.filter(
    (date: DisplayDate | undefined) =>
      date?.date.includes(currentYear.toString()),
  );

  const lightMode = toggleDarkMode == "dark" ? "even-row" : "even-dark"
  const darkMode = toggleDarkMode == "dark" ? "lightBtn" : "dark-btn"

  const tableData = filteredDates
    .map((date: DisplayDate | undefined, i: number) => {
      return (
        <tr key={`year-${i}`} className={`${i % 2 === 0 ? lightMode : darkMode} w-full`}>
          <td className="text-3xl p-2">{date?.date}</td>
          <td className="text-3xl p-2">{date?.quantityTotal}</td>
          <td className="text-3xl p-2">${date?.totalProfit}</td>
        </tr>
      );
    })
    .slice(props.startIndex, props.endIndex);

  return (
    <section>
      <PaginatedButtons
        className="flex"
        currentPage={props.currentPage}
        cartLength={filteredDates.length}
        setCurrentPage={(e: number) => props.setCurrentPage(e)}
        rowsPerPage={props.rowsPerPage}
      />

      <table>
        <thead>
        <tr className={`${toggleDarkMode === "dark" ? "lightBtn" : "dark-btn"}`}>
            <th className="text-3xl p-2">Date</th>
            <th className="text-3xl p-2">Quantities Sold</th>
            <th className="text-3xl p-2">Profit Made</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </section>
  );
}
