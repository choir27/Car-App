import { handleChangeTime } from "./HandleChangeTime";
import { TimeDateAppointments } from "../../middleware/Interfaces";

export default function RenderTimeButton({
  i,
  time,
  props,
}: {
  i: number;
  time: string[];
  props: TimeDateAppointments;
}) {
  return (
    <button
      className={`clearButton t-${i} time`}
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
