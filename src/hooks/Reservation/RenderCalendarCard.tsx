import { TimeDateAppointments } from "../../middleware/Interfaces/Reservation";
import { handleRenderCalendar } from "./HandleRenderCalendar";
import { checkAppointmentDate } from "./CheckAppointmentDate";

export default function CalendarCard({
  i,
  currentMonth,
  currentDay,
  currentYear,
  setSelectedDate,
  daysOfWeek,
  currentDayOfWeek,
  props,
  clickedClassName,
  disabled
}: {
  i: number;
  currentMonth: number;
  currentDay: number;
  currentYear: number;
  setSelectedDate: (e: string) => void;
  daysOfWeek: string[];
  currentDayOfWeek: number;
  props: TimeDateAppointments;
  clickedClassName: string;
  disabled?: string
}) {
  return (
    <div
      className={`calendar c-${i} ${clickedClassName} ${disabled}`}
      key={`c-${i}`}
      onClick={() => {
        if(disabled !== "disabled"){
        const date = `${currentMonth}/${currentDay}/${currentYear}`;
        checkAppointmentDate({
          date: date,
          setDate: (e: string) => props.setDate(e),
        });
        setSelectedDate(date);
        handleRenderCalendar({
          currentMonth: currentMonth,
          currentDay: currentDay,
          currentYear: currentYear,
          daysOfWeek: daysOfWeek,
          currentDayOfWeek,
          setDate: (e: string) => props.setDate(e),
          i: i,
        });
      }}
    }
    >
      <h3>{daysOfWeek[currentDayOfWeek]}</h3>
      <h3>{`${currentMonth}/${currentDay}/${currentYear}`}</h3>
    </div>
  );
}
