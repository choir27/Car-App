import { ChooseInput } from "../../middleware/Interfaces/Inputs";

export function ChooseTwoInput(props: ChooseInput) {
  return (
    <section
      className={`${props.className} flex justify-between w-full`}
    >
      <div className="mb-2">
        <input
          className="radio"
          type="radio"
          value={props.text1}
          name={props.name}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <label>{props.text1}</label>
      </div>

      <div>
        <input
          className="radio"
          type="radio"
          value={props.text2}
          name={props.name}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <label>{props.text2}</label>
      </div>
    </section>
  );
}
