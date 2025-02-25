import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PaginatedButtons from "./PaginatedButtons";
import { GraphLabels } from "../../middleware/Interfaces/Purchases";
import { DisplayDate } from "../../middleware/Interfaces/Reservation"
import Query_Offset from "./Query_Offset";

// array of number elements are being passed through for the values of the datasets
// only show the first 10 elements of that array
// if the user clicks on button 2, then the next 10 elements of the array will be shown, but the previous 10 elements will be hidden

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function BarGraph(props: GraphLabels) {
  const date = props.dates.map((date: DisplayDate) => date.date);

  const data = {
    labels: date.slice(props.startIndex, props.endIndex),
    datasets: [
      {
        label: "Quantities Sold",
        data: props.quantities.slice(props.startIndex, props.endIndex),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Total Profit",
        data: props.profits.slice(props.startIndex, props.endIndex),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <section>
      <PaginatedButtons
        className="flex"
        currentPage={props.currentPage}
        cartLength={props.cartLength}
        setCurrentPage={(e: number) => props.setCurrentPage(e)}
        rowsPerPage={props.rowsPerPage}
      />

      <Bar data={data} />
      {Query_Offset(props.length, props.limit, (e: number) =>
        props.setLimit(e),
      )}
    </section>
  );
}
