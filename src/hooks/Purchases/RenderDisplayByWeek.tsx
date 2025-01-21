import { DisplayBy, DisplayDate } from "../../middleware/Interfaces";
import { getYear, getMonth } from "../Reservation/DatesStatic";
import { GetPurchasedDates } from "./GetPurchasedDates";
import PaginatedButtons from "../../components/Graphs/PaginatedButtons";

export function RenderDisplayByWeek({
  props,
  currentWeek,
}: {
  props: DisplayBy;
  currentWeek: number[];
}) {
  function filterDate(date: string | undefined) {
    return currentWeek.filter((day: number) => day === Number(date));
  }

  const filteredDates = GetPurchasedDates(props.purchases).filter(
    (date: DisplayDate | undefined) =>
      date?.date.split("-")[0].includes(getYear().toString()) &&
      date?.date.split("-")[1].includes(getMonth().toString()) &&
      filterDate(date?.date.split("-")[2])[0],
  );

  const tableData = filteredDates
    .map((date: DisplayDate | undefined, i: number) => {
      return (
        <tr key={`week-${i}`} className={`${i % 2 === 0 ? "even" : "odd"}`}>
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
