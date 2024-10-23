// import styled, { css } from "styled-components";
import { ButtonProps } from "../../types/Button";

export default function Button({
  type,
  button,
  disabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      id={button}
      name={button}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
