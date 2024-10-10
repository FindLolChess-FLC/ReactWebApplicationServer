import { UseFormRegisterReturn } from "react-hook-form"; // props로 전달 받기 위해 UseFormRegisterReturn 사용

export type InputBoxProps = {
  labelname?: string;
  register: UseFormRegisterReturn;
  type: string;
  inputBox: string;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  readOnly?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};
