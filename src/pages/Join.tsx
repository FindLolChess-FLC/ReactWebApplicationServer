import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useUserInput from "../hooks/useUserInput";
import useNumberInput from "../hooks/useNumberInput";
import InputBox from "../components/common/InputBox";
import { Api } from "../utils/apis/Api";
import { JoinForm } from "../types/Join";
import checkDuplicate from "../utils/checkDuplicate";
import { VerificationCodeForm } from "../types/VerificationCode";
import CountDown from "../components/CountDown";

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
    watch,
  } = useForm({ mode: "onBlur", resolver: yupResolver(combinedSchema) });

  const navigate = useNavigate();
  const codeEmail = watch("email");
  const codeData = watch("code");

  // 가입하기 버튼 누르면 동작
  function onSubmit(data: JoinForm) {
    Api({
      bodyData: data,
      method: "POST",
      lastUrl: "user/signup/",
    });
    navigate("/login");
  }

  // 인증번호 버튼 누르면 동작
  function handleReceiveVerificationCode() {
    Api({
      method: "GET",
      lastUrl: `user/verification/?email=${codeEmail}`,
    });
  }

  // 확인 버튼 누르면 동작
  function handleSendVerificationCode(data: VerificationCodeForm) {
    Api({
      bodyData: data,
      method: "POST",
      lastUrl: "user/verification/",
    });
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
            // 닉네임 중복 체크
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
              // 이메일 중복 체크
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
          <button type="button" onClick={handleReceiveVerificationCode}>
            인증번호
          </button>
        </div>
        {errors.email && <p>{errors.email.message}</p>}
        <div>
          <InputBox
            inputBox="code"
            type="number"
            placeholder="이메일로 받은 인증번호를 입력해주세요."
            register={register("code")}
          />
          <CountDown />
          <button
            type="button"
            onClick={() =>
              handleSendVerificationCode({ email: codeEmail, code: codeData })
            }
          >
            확인
          </button>
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
