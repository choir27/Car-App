import { Choose } from "../../middleware/Interfaces/Inputs";

export function EditChooseTwoInput(props: Choose) {
  if (props.defaultValue === props.text2) {
    return (
      <div className="my-2 w-full flex justify-between">
        <div>
          <input
            className="mr-1"
            type="radio"
            value={props.text1}
            name={props.name}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <label>{props.text1}</label>
        </div>
        <div>
          <input
            className="mr-1"
            checked
            type="radio"
            value={props.text2}
            name={props.name}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <label>{props.text2}</label>
        </div>
      </div>
    );
  } else if (props.defaultValue === props.text1) {
    return (
      <div className="my-2 w-full flex justify-between">
        <div>
          <input
            className="mr-1"
            checked
            type="radio"
            value={props.text1}
            name={props.name}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <label>{props.text1}</label>
        </div>
        <div>
          <input
            className="mr-1"
            type="radio"
            value={props.text2}
            name={props.name}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <label>{props.text2}</label>
        </div>
      </div>
    );
  }
}
