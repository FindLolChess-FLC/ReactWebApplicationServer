import styled, { css } from "styled-components";
import { ButtonForm } from "../../types/Button";

const StyleButton = styled.button<ButtonForm>`
  /* 기본 버튼 스타일 */
  width: ${props => props.width || `25.625rem`}; // 410px
  height: ${props => props.height || `3.75rem`}; // 60px
  background: ${props => props.$bgcolor || `#5144ed`};
  font-size: 1rem; // 16px
  border-radius: 4px;
  color: #fff;
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

    /* 채팅 button의 스타일 */
    ${props =>
    props.id === "chat" &&
    css`
      margin: 5px 0;
      padding: 9px 15px;
      border-radius: 7px;
      background: #5661ff;
      font-size: 12px;
      font-weight: 400;
      &:hover {
        border: none;
        border-radius: 7px;
        background: #3845f9;
        font-size: 12px;
        font-weight: 400;
        color: #fff;
      }
    `}
     /* 채팅 button의 disabled 스타일 */
    ${props =>
    props.id === "chat" &&
    props.disabled === true &&
    css`
      background: rgba(86, 97, 255, 0.5);
    `}
`;

export default function Button({
  width,
  height,
  $bgcolor,
  id,
  type,
  name,
  disabled,
  onClick,
  children,
}: ButtonForm) {
  return (
    <StyleButton
      width={width}
      height={height}
      $bgcolor={$bgcolor}
      id={id}
      type={type === "submit" ? "submit" : "button"}
      name={name}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyleButton>
  );
}
