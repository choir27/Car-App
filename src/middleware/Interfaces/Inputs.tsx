export interface ButtonProps {
  text: string;
  handleButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  classNames?: string;
  key?: string;
}

export interface ButtonSubmitProps {
  className?: string;
  text: string;
  handleButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export interface ButtonLinkProps {
  domain: string;
  text: string;
  classNames?: string;
}

//interface type for comment input
export interface TextBox {
  height: number;
  width: number;
  onChange: (e: string) => void;
  placeholder: string;
}

//interface type for general inputs
export interface GeneralInput {
  disabled?: boolean;
  name?: string;
  type: string;
  onChange: (e: any) => void;
  placeholder?: string;
  minlength?: number;
  maxlength?: number;
  value?: string;
  defaultValue?: string;
  id?: string;
  className?: string;
}

export interface ChooseInput {
  text1: string;
  text2: string;
  name: string;
  onChange: (e: string) => void;
  className?: string;
}

export interface Choose {
  text1: string;
  text2: string;
  className?: string;
  name: string;
  onChange: (e: string) => void;
  defaultValue: string | undefined;
}
