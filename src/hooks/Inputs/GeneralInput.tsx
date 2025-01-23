import { GeneralInput } from "../../middleware/Interfaces/Inputs";

export function Input(props: GeneralInput): React.JSX.Element {
  return (
    <input
      id={props.id}
      value={props.value}
      defaultValue={props.defaultValue}
      name={props.name}
      disabled={props.disabled}
      type={props.type}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      minLength={props.minlength}
      maxLength={props.maxlength}
    />
  );
}
