import { ChooseInput } from "../../middleware/Interfaces/Inputs";

export function ChooseTwoInput(props: ChooseInput) {
  return (
    <section className="flex justifyCenter">
      <input
        type="radio"
        value={props.text1}
        name={props.name}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <label>{props.text1}</label>

      <input
        type="radio"
        value={props.text2}
        name={props.name}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <label>{props.text2}</label>
    </section>
  );
}
