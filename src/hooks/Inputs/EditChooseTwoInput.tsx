import { Choose } from "../../middleware/Interfaces/Inputs";

export function EditChooseTwoInput(props: Choose) {
    if (props.defaultValue === props.text2) {
      return (
        <div className="my-2">
          <input
            type="radio"
            value={props.text1}
            name={props.name}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <label>{props.text1}</label>
  
          <input
            checked
            type="radio"
            value={props.text2}
            name={props.name}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <label>{props.text2}</label>
        </div>
      );
    } else if (props.defaultValue === props.text1) {
      return (
        <div className="my-2">
          <input
            checked
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
        </div>
      );
    }
  }
  