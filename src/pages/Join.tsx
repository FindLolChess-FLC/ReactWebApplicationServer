import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import useUserInput from "../hooks/useUserInput";
import useNumberInput from "../hooks/useNumberInput";
import InputBox from "../components/InputBox";
import { signupUser } from "../utils/apis/user";

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

  const navigate = useNavigate();

  function onSubmit(data: any) {
    signupUser(data);
    navigate("/login");
  }
  return (
    <div>
      <p>Join</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          inputBox="nickname"
          labelname="닉네임"
          type="text"
          placeholder="닉네임을 2~12글자로 입력해주세요."
          register={register("nickname")}
        />
        <div>
          <InputBox
            inputBox="email"
            labelname="이메일"
            type="text"
            placeholder="이메일 형식을 맞춰서 입력해주세요."
            register={register("email")}
          />
          <button type="button">인증번호</button>
        </div>
        {errors.email && <p>{errors.email.message}</p>}
        <div>
          <InputBox
            inputBox="emailNumber"
            type="number"
            placeholder="이메일로 받은 인증번호를 입력해주세요."
            register={register("emailNumber")}
          />
          <button type="button">확인</button>
        </div>
        <InputBox
          inputBox="password"
          labelname="새 비밀번호"
          type="text"
          placeholder="비밀번호를 8~16글자로 입력해주세요."
          register={register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">가입하기</button>
      </form>
      <Link to="/">메인으로 가기</Link>
    </div>
  );
}
