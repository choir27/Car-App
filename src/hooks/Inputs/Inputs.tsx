import {
    TextBox,
    GeneralInput,
    ChooseInput,
  } from "../../middleware/Interfaces";

export function TextBoxInput(props: TextBox): React.JSX.Element {
  return (
    <textarea
      rows={props.height}
      cols={props.width}
      spellCheck={true}
      wrap="hard"
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
}

export function Input(props: GeneralInput): React.JSX.Element {
  return (
    <input
      id={props.id}
      value={props.value}
      defaultValue={props.defaultValue}
      type={props.type}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      minLength={props.minlength}
      maxLength={props.maxlength}
    />
  );
}

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
