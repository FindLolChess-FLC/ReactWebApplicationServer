import styled, { css } from "styled-components";
import { InputProps } from "../../types/Input";
import "../../fonts/index.css";

const StyleTitle = styled.p`
  color: #0d0d0d;
`;

const StyleInput = styled.input`
  /* 기본 input 스타일 */
  width: ${props => props.width || `25.625rem`}; // 410px
  height: ${props => props.height || `3.75rem`}; // 60px
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  color: #0d0d0d;
  font-size: 0.9375rem; // 15px
  font-weight: 300;
  padding: 0.8125rem 1.1875rem; // 13px 19px
  margin: 0.25rem 0; // 4px

  &::placeholder {
    color: #888;
  }

  &:focus {
    border: 2px solid #17171b;
    outline: none;
  }

  /* input의 box가 사라지는 스타일 */
  ${props =>
    props.id === "code" &&
    css`
      border: none;
      outline: none;

      &:focus {
        border: none;
      }
    `}

  /* password *(별) 스타일 */
  ${props =>
    props.type === "password" &&
    css`
      font-family: "Asterisk", sans-serif;
      font-size: 0.5625rem; // 9px
      padding-top: 1rem; // 16px

      &::placeholder {
        font-family: "Pretendard", sans-serif;
        font-size: 0.9375rem; // 15px
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
