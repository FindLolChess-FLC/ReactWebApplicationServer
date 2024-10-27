import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUserInput from "../hooks/useUserInput";
import useNumberInput from "../hooks/useNumberInput";
import Input from "../components/common/Input";
import { Api } from "../utils/apis/Api";
import { JoinForm } from "../types/Join";
import checkDuplicate from "../utils/checkDuplicate";
import { VerificationCodeForm } from "../types/VerificationCode";
import CountDown from "../components/CountDown";
import Button from "../components/common/Button";

const StyleError = styled.p`
  color: #fe2e00;
  font-size: 12px;
  font-weight: 300;
`;

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
  const onSubmit = (data: JoinForm) => {
    Api({
      bodyData: data,
      method: "POST",
      lastUrl: "user/signup/",
    });
    navigate("/login");
  };

  // 인증번호 버튼 누르면 동작
  const handleReceiveVerificationCode = () => {
    Api({
      method: "GET",
      lastUrl: `user/verification/?email=${codeEmail}`,
    });
  };

  // 확인 버튼 누르면 동작
  const handleSendVerificationCode = (data: VerificationCodeForm) => {
    Api({
      bodyData: data,
      method: "POST",
      lastUrl: "user/verification/",
    });
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          width="28.125rem"
          height="3.5rem"
          input="nickname"
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
        {errors.nickname && <StyleError>{errors.nickname.message}</StyleError>}
        <div>
          <Input
            width="20rem"
            height="3.5rem"
            input="email"
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
          <Button
            width="7.5rem"
            height="3.5rem"
            type="button"
            id="verification"
            onClick={handleReceiveVerificationCode}
          >
            인증번호
          </Button>
        </div>
        {errors.email && <StyleError>{errors.email.message}</StyleError>}
        <div>
          <Input
            width="20rem"
            height="3.5rem"
            input="code"
            type="number"
            placeholder="인증번호를 입력해주세요."
            register={register("code")}
          />
          {CountDown(180)}
          <Button
            width="7.5rem"
            height="3.5rem"
            type="button"
            id="check"
            onClick={() =>
              handleSendVerificationCode({ email: codeEmail, code: codeData })
            }
          >
            확인
          </Button>
        </div>
        <Input
          width="28.125rem"
          height="3.5rem"
          input="password"
          labelname="비밀번호"
          type="password"
          placeholder="비밀번호를 8~16글자로 입력해주세요."
          register={register("password")}
        />
        {errors.password && <StyleError>{errors.password.message}</StyleError>}
        <Button width="28.125rem" type="submit" id="join" name="join">
          가입하기
        </Button>
      </form>
      <Link to="/">메인으로 가기</Link>
    </div>
  );
}
