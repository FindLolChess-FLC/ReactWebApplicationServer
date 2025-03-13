import styled, { css } from "styled-components";
import { InputForm } from "../../types/Input";
import "../../fonts/index.css";

const StyleTitle = styled.p`
  color: #0d0d0d;
  ${props =>
    props.id === "edit" &&
    css`
      color: #5b5b5b;
      font-size: 11px;
      font-weight: 400;
    `}
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
  margin: 0.75rem 0 0.8125rem 0; // 12px 13px

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
      margin: 0;

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

   /* Searchbar input의 스타일 */
  ${props =>
    props.id === "search" &&
    css`
      font-size: 1.125rem; // 18px
      border: none;
      width:  34.375rem; // 550px;
      &:focus {
        border: none;
        }
      }
    `}

   /* 채팅 input의 스타일 */
  ${props =>
    props.id === "chat" &&
    css`
      margin: 5px 0;
      padding: 9px 14px;
      font-size: 12px;
      font-weight: 400;
      &:focus {
        border: 1px solid #17171b;
      }
    `}
   /* 채팅 수정 시 input의 스타일 */
  ${props =>
    props.id === "edit" &&
    css`
      margin: 5px 0;
      padding: 9px 14px;
      font-size: 12px;
      font-weight: 400;
      background: #efefef;
      border: none;
      &:focus {
        border: 1px solid #17171b;
      }
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
  disabled,
  onFocus,
}: InputForm) {
  return (
    <label htmlFor={input}>
      <StyleTitle id={input}>{labelname}</StyleTitle>
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
          disabled={disabled}
          onFocus={onFocus}
        />
      </div>
    </label>
  );
}
