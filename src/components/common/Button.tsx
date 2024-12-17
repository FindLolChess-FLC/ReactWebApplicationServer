import styled, { css } from "styled-components";
import { ButtonForm } from "../../types/Button";

const StyleButton = styled.button<ButtonForm>`
  /* 기본 버튼 스타일 */
  width: ${props => props.width || `25.625rem`}; // 410px
  height: ${props => props.height || `3.75rem`}; // 60px
  background: ${props => props.bgcolor || `#5144ed`};
  border-radius: 4px;
  color: #fff;
  font-size: 1rem; // 16px

  &:hover {
    background: #6f63ff;
  }
  /* submit 버튼 스타일 */
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
        font-size: 1rem; // 16px
        color: #6200e0;
      }
    `}

  /* 기본 버튼 disabled 스타일 */
  ${props =>
    props.disabled === true &&
    css`
      background: #6c6c6c;
      cursor: not-allowed; /* 비활성화 시 마우스 커서 */
      pointer-events: none; /* 클릭 등 이벤트 차단 */
    `}

  /* 변경사항 버튼 스타일 */
  ${props =>
    props.id === "save" &&
    css`
      width: 10rem; /* 160px */
      height: 3.125rem; /* 50px */
      font-size: 0.9375rem; /* 15px */
      background: #5144ed;
      &:hover {
        background: #6f63ff;
        color: #fff;
        font-size: 0.9375rem; /* 15px */
      }
    `}
    
/* 변경사항 버튼 disabled 스타일 */
    ${props =>
    props.id === "save" &&
    props.disabled === true &&
    css`
      background: #f4f4f4;
      color: #888;
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
}: ButtonForm) {
  return (
    <StyleButton
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
    </StyleButton>
  );
}
