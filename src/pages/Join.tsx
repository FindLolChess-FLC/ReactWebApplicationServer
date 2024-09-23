import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useUserInput from "../hooks/useUserInput";
import useNumberInput from "../hooks/useNumberInput";
import InputBox from "../components/InputBox";
import { Api } from "../utils/apis/Api";
import { JoinForm } from "../types/Join";
import checkDuplicate from "../utils/checkDuplicate";

export default function Join() {
  // useUserInput에서 input validation schema
  const loginSchema = useUserInput();
  // useUserInput에서 input validation schema
  const joinSchema = useNumberInput();
  // Schema 통합
  const combinedSchema = loginSchema.concat(joinSchema);
  // useForm으로 form 관리
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(combinedSchema) });

  const navigate = useNavigate();

  function onSubmit(data: JoinForm) {
    Api({
      bodyData: data,
      method: "POST",
      lastUrl: "user/signup/",
    });
    navigate("/login");
  }

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          inputBox="nickname"
          labelname="닉네임"
          type="text"
          placeholder="닉네임을 2~12글자로 입력해주세요."
          register={register("nickname", {
            onBlur: async data => {
              const response = await checkDuplicate({
                key: "nickname",
                value: data.target.value,
              });
              if (response.resultcode !== "SUCCESS") {
                setError("nickname", { message: response });
              }
            },
          })}
        />
        {errors.nickname && <p>{errors.nickname.message}</p>}
        <div>
          <InputBox
            inputBox="email"
            labelname="이메일"
            type="text"
            placeholder="이메일 형식을 맞춰서 입력해주세요."
            register={register("email", {
              onBlur: async data => {
                const response = await checkDuplicate({
                  key: "email",
                  value: data.target.value,
                });
                if (response.resultcode !== "SUCCESS") {
                  setError("email", { message: response });
                }
              },
            })}
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
