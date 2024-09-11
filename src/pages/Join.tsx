import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useUserInput from "../hooks/useUserInput";
import useNumberInput from "../hooks/useNumberInput";
import InputBox from "../components/InputBox";
import { signupUser } from "../apis/user";

export default function Join() {
  // useUserInput에서 input validation schema
  const loginSchema = useUserInput();
  // useUserInput에서 input validation schema
  const joinSchema = useNumberInput();
  // Schema 통합
  const combinedSchema = yup.object().shape({
    ...loginSchema.fields, // loginSchema의 필드 추가
    ...joinSchema.fields, // joinSchema의 필드 추가
  });
  // useForm으로 form 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(combinedSchema) });
  // 임시
  const onSubmit = (data: any) => {
    console.log(data);
    signupUser(data);
  };
  return (
    <div>
      <p>Join</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          inputBox="nickname"
          labelname="새 닉네임"
          type="text"
          placeholder="닉네임을 2글자 이상으로 입력해주세요."
          register={register("nickname")}
        />
        <div>
          <InputBox
            inputBox="email"
            labelname="새 아이디"
            type="text"
            placeholder="이메일 형식을 맞춰서 입력해주세요."
            register={register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <button type="button">이메일 확인</button>
          <InputBox
            inputBox="emailNumber"
            labelname="인증 번호"
            type="number"
            placeholder="이메일로 받은 인증번호를 입력해주세요."
            register={register("emailNumber")}
          />
        </div>
        <InputBox
          inputBox="password"
          labelname="새 비밀번호"
          type="text"
          placeholder="비밀번호를 8~16글자로 입력해주세요."
          register={register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
