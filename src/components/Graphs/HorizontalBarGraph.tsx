import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PaginatedButtons from "./PaginatedButtons"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    }
  },
};


interface GraphLabels{
    profits: any[],
    quantities: any[],
    dates: any[],
    cartLength: number,
    currentPage: number,
    setCurrentPage: (e:number) => void,
    rowsPerPage: number,
    startIndex: number,
    endIndex: number
  }
  

export default function HorizontalBarGraph(props:GraphLabels){

    const data = {
        labels: props.dates.slice(props.startIndex, props.endIndex),
        datasets: [
          {
            label: "Quantities",
            data: props.quantities.slice(props.startIndex, props.endIndex),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: "Profits",
            data: props.profits.slice(props.startIndex, props.endIndex),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return(
      <section>
        <PaginatedButtons currentPage = {props.currentPage} cartLength = {props.cartLength} setCurrentPage = {(e:number)=>props.setCurrentPage(e)} rowsPerPage={props.rowsPerPage}/>
        <Bar options = {options} data={data}/>
        <PaginatedButtons currentPage = {props.currentPage} cartLength = {props.cartLength} setCurrentPage = {(e:number)=>props.setCurrentPage(e)} rowsPerPage={props.rowsPerPage}/>
        </section>
    )
}