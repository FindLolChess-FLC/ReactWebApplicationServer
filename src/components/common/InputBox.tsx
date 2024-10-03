import { InputBoxProps } from "../../types/Input";

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
          type={type}
          id={inputBox}
          placeholder={placeholder}
          min={min}
          max={max}
          {...register}
          readOnly={readOnly}
        />
      </div>
    </label>
  );
}
