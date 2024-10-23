import styled, { css } from "styled-components";
import { ButtonProps } from "../../types/Button";

const DefaultButton = styled.button`
  width: 25.625rem;
  height: 3.75rem;
  border-radius: 8px;
  background: #5144ed;
  color: #fff;
  font-size: 1rem;

  /* 기본 버튼 hover 스타일 */
  &:hover {
    background: #6f63ff;
  }

  ${props =>
    props.type === "submit" &&
    css`
      background: linear-gradient(90deg, #9600da 0%, #6200e0 50%, #33b1f5 100%);

      &:hover {
        border: 2px solid transparent;
        border-radius: 8px;
        background-image: linear-gradient(#fff, #fff),
          linear-gradient(90deg, #9600da 0%, #6200e0 50%, #33b1f5 100%);
        background-origin: border-box;
        background-clip: content-box, border-box;
        font-size: 1rem;
        color: #9600da;
      }
    `}
`;
export default function Button({
  type,
  button,
  disabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <DefaultButton
      type={type === "submit" ? "submit" : "button"}
      id={button}
      name={button}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </DefaultButton>
  );
}
