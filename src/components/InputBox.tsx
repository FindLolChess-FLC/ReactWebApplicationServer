import { UseFormRegisterReturn } from "react-hook-form"; // props로 전달 받기 위해 UseFormRegisterReturn 사용

type InputBoxProps = {
  labelname: string;
  register: UseFormRegisterReturn;
  type: string;
  inputBox: string;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  readOnly?: boolean;
};

export default function InputBox({
  labelname,
  register,
  type,
  inputBox,
  placeholder,
  min,
  max,
  readOnly,
}: InputBoxProps) {
  return (
    <label htmlFor={inputBox}>
      <p>{labelname}</p>
      <div>
        <input
          {...register}
          type={type}
          id={inputBox}
          placeholder={placeholder}
          min={min}
          max={max}
          readOnly={readOnly}
        />
      </div>
    </label>
  );
}
