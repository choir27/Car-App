import { handleChangeTime } from "./HandleChangeTime";
import { TimeDateAppointments } from "../../middleware/Interfaces/Reservation";

export default function RenderTimeButton({
  i,
  time,
  props,
  clickedClassName
}: {
  i: number;
  time: string[];
  props: TimeDateAppointments;
  clickedClassName?: string;
}) {
  return (
    <button
      className={`t-${i} time ${clickedClassName}`}
      key={i}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        handleChangeTime({
          i: i,
          e: event,
          time: time[1],
          setTime: (e: string) => props.setTime(e),
        })
      }
    >
      {time[0]}
    </button>
  );
}
