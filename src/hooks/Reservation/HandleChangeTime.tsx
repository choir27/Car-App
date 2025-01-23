import { ChangeTime } from "../../middleware/Interfaces/Reservation";

export function handleChangeTime(props: ChangeTime) {
  props.e.preventDefault();

  props.setTime(props.time);

  document.querySelectorAll(".time").forEach((ele) => {
    ele.classList.remove("clicked");
  });

  document.querySelector(`.t-${props.i}`)?.classList.add("clicked");
}
