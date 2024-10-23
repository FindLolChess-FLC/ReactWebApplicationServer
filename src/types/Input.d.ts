import { UseFormRegisterReturn } from "react-hook-form"; // props로 전달 받기 위해 UseFormRegisterReturn 사용

export type InputProps = {
  labelname?: string;
  register: UseFormRegisterReturn;
  type: string; // text, password, number 등 다양한 타입
  input: string;
  placeholder?: string;
  autoComplete?: "on" | "off";
  min?: number | string;
  max?: number | string;
  readOnly?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};
