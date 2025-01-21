import PaginatedButtons from "../../components/Graphs/PaginatedButtons";
import {
  DisplayBy,
  DisplayDate,
} from "../../middleware/Interfaces";
import {getYear} from "../Reservation/DatesStatic"
import { GetPurchasedDates } from "./GetPurchasedDates";

export function DisplayByYear(props: DisplayBy) {
  const currentYear = getYear();
  const purchasedDates = GetPurchasedDates(props.purchases);
  const filteredDates = purchasedDates.filter(
    (date: DisplayDate | undefined) =>
      date?.date.includes(currentYear.toString()),
  );
  const tableData = filteredDates
    .map((date: DisplayDate | undefined, i: number) => {
      return (
        <tr key={`year-${i}`} className={`${i % 2 === 0 ? "even" : "odd"}`}>
          <td>{date?.date}</td>
          <td>{date?.quantityTotal}</td>
          <td>${date?.totalProfit}</td>
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
          <tr>
            <th>Date</th>
            <th>Quantities Sold</th>
            <th>Profit Made</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </section>
  );
}