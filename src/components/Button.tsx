import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {  ButtonProps,
  ButtonSubmitProps,
  ButtonLinkProps,} from "../middleware/Interfaces/Inputs"
import { DarkModeContext } from "../middleware/Context";

export function ButtonSubmit(props: ButtonSubmitProps) {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      className={`button ${props.className} ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.handleButtonClick(e);
      }}
    >
      {props.text}
    </button>
  );
}

export function Button(props: ButtonProps) {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      key={props.key}
      className={`button ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"} ${props.classNames}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.handleButtonClick(e);
      }}
    >
      {props.text}
    </button>
  );
}

export function ButtonLink(props: ButtonLinkProps): React.JSX.Element {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <Link className={`button ${props.classNames} ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`} to={`${props.domain}`}>
      {props.text}
    </Link>
  );
}
