import { TextBox } from "../../middleware/Interfaces/Inputs";

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
