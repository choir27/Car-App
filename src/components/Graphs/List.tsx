import { useState, useContext } from "react";
import { DisplayByMonth } from "../../hooks/Purchases/DisplayByMonth";
import { DisplayByWeek } from "../../hooks/Purchases/DisplayByWeek";
import { DisplayByYear } from "../../hooks/Purchases/DisplayByYear";
import { Button } from "../../components/Button";
import { ListLabels } from "../../middleware/Interfaces";
import { APIContext } from "../../middleware/Context";

export default function List(props: ListLabels) {
  const [display, setDisplay] = useState<string>("week");
  const { purchases } = useContext(APIContext);

  return (
    <section>
      <div className="flex buttons justifyBetween">
        {Button({ text: "Week", handleButtonClick: () => setDisplay("week") })}
        {Button({
          text: "Month",
          handleButtonClick: () => setDisplay("month"),
        })}
        {Button({ text: "Year", handleButtonClick: () => setDisplay("year") })}
      </div>

      {display === "week"
        ? DisplayByWeek({
            purchases: purchases,
            startIndex: props.startIndex,
            endIndex: props.endIndex,
            currentPage: props.currentPage,
            rowsPerPage: props.rowsPerPage,
            setCurrentPage: (e: number) => props.setCurrentPage(e),
          })
        : ""}
      {display === "month"
        ? DisplayByMonth({
            purchases: purchases,
            startIndex: props.startIndex,
            endIndex: props.endIndex,
            currentPage: props.currentPage,
            rowsPerPage: props.rowsPerPage,
            setCurrentPage: (e: number) => props.setCurrentPage(e),
          })
        : ""}
      {display === "year"
        ? DisplayByYear({
            purchases: purchases,
            startIndex: props.startIndex,
            endIndex: props.endIndex,
            currentPage: props.currentPage,
            rowsPerPage: props.rowsPerPage,
            setCurrentPage: (e: number) => props.setCurrentPage(e),
          })
        : ""}
    </section>
  );
}
