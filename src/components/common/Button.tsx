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
      overflow: hidden;

      &:hover {
        background: #fff; /* 배경을 흰색으로 변경 */
        color: transparent; /* 글자를 투명하게 */
        border: 4px solid transparent;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        background-image: linear-gradient(
          90deg,
          #9600da 0%,
          #6200e0 50%,
          #33b1f5 100%
        );
        border-image: linear-gradient(
          90deg,
          #9600da 0%,
          #6200e0 50%,
          #33b1f5 100%
        );
        border-image-slice: 1; /* 그라디언트를 테두리에 적용 */
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
