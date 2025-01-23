import { RenderCalendar } from "../../middleware/Interfaces";

export function handleRenderCalendar(props: RenderCalendar) {
  const date = `${props.currentMonth}/${props.currentDay}/${
    props.currentYear
  }D${props.daysOfWeek[props.currentDayOfWeek]}`;
  props.setDate(date);
  document.querySelectorAll(".calendar").forEach((ele) => {
    ele.classList.remove("clicked");
  });

  document.querySelector(`.c-${props.i}`)?.classList.add("clicked");
}
