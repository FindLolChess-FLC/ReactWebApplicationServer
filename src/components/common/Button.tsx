import styled, { css } from "styled-components";
import { ButtonProps } from "../../types/Button";

const DefaultButton = styled.button<ButtonProps>`
  width: ${props => props.width || `25.625rem`};
  height: ${props => props.height || `3.75rem`};
  background: ${props => props.bgcolor || `#5144ed`};
  border-radius: 4px;
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
        border: 3.5px solid transparent;
        border-radius: 4px;
        background-image: linear-gradient(#fff, #fff),
          linear-gradient(90deg, #9600da 0%, #6200e0 50%, #33b1f5 100%);
        background-origin: border-box;
        background-clip: content-box, border-box;
        font-size: 1rem;
        color: #6200e0;
      }
    `}

  ${props =>
    props.disabled === true &&
    css`
      background: #6c6c6c;
    `}
`;
export default function Button({
  width,
  height,
  bgcolor,
  type,
  id,
  name,
  disabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <DefaultButton
      width={width}
      height={height}
      bgcolor={bgcolor}
      type={type === "submit" ? "submit" : "button"}
      id={id}
      name={name}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </DefaultButton>
  );
}
