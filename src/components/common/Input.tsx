import styled, { css } from "styled-components";
import { InputProps } from "../../types/Input";
import "../../fonts/index.css";

const StyleTitle = styled.p`
  color: #0d0d0d;
`;
const StyleInput = styled.input`
  /* 기본 input 스타일 */
  width: ${props => props.width || `25.625rem`};
  height: ${props => props.height || `3.75rem`};
  border-radius: 4px;
  border: 1px solid #bfbfbf;
  color: #0d0d0d;
  font-size: 15px;
  font-weight: 300;
  padding: 13px 19px;
  margin: 4px 0px;

  &::placeholder {
    color: #888;
  }

  &:focus {
    border: 2px solid #17171b;
  }

  /* password *(별) 스타일 */
  ${props =>
    props.type === "password" &&
    css`
      font-family: "Asterisk", sans-serif;
      font-size: 9px;
      padding-top: 16px;

      &::placeholder {
        font-family: "Pretendard", sans-serif;
        font-size: 15px;
      }
    `}

  /* disabled 스타일 */
  ${props =>
    props.disabled === true &&
    css`
      border: 1px solid #d4d4d8;
      background: #d4d4d8;
    `}
`;
export default function Input({
  width,
  height,
  labelname,
  register,
  type,
  input,
  placeholder,
  autoComplete,
  min,
  max,
  readOnly,
  onFocus,
}: InputProps) {
  return (
    <label htmlFor={input}>
      <StyleTitle>{labelname}</StyleTitle>
      <div>
        <StyleInput
          width={width}
          height={height}
          type={type}
          id={input}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          max={max}
          {...register}
          readOnly={readOnly}
          onFocus={onFocus}
        />
      </div>
    </label>
  );
}
