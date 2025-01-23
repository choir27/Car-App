import { DisplayBy } from "../../middleware/Interfaces";
import { getYear, getMonth, getDay, getDayOfWeek } from "../Reservation/DatesStatic";
import { currentWeekLogic } from "./CurrentWeek";
import { RenderDisplayByWeek } from "./RenderDisplayByWeek";

export function DisplayByWeek(props: DisplayBy) {
  let currentDay = getDay();
  
  let currentWeek: number[] = [];

  let i = 0;

  if (getDayOfWeek()) {
    currentDay -= getDayOfWeek();
  }

  while (i < 7) {
    currentWeekLogic({currentWeek, currentMonth: getMonth(), currentDay: getDay(), currentYear: getYear(), i})
  }
  
  return RenderDisplayByWeek({props, currentWeek})
}