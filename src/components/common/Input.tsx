import { InputProps } from "../../types/Input";

export default function Input({
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
      <p>{labelname}</p>
      <div>
        <input
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
