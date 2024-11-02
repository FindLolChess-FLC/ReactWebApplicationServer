import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem; //14px
  height: 100vh;
  padding: 7.875rem; // 126px
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem; // 14px
`;

const Title = styled.h1`
  color: #0d0d0d;
  text-align: center;
  font-size: 2.5rem; // 40px
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailDiv = styled.div`
  display: grid;
  align-items: end;
  column-gap: 0.625rem; // 10px
  > button {
    grid-column-start: 2;
    margin: 0.1875rem 0 0.8125rem 0; // 3px 13px
  }
`;

const CodeDiv = styled.div`
  display: grid;
  align-items: end;
  column-gap: 0.625rem; // 10px
  > button {
    grid-column-start: 2;
  }
`;

const CountDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20rem;
  height: 3.5rem;
  border: 1px solid #bfbfbf;
  border-radius: 4px;

  &:focus {
    border: 2px solid #17171b;
  }

  &:focus-within {
    border: 2px solid #17171b;
  }
`;

const StyleError = styled.p`
  color: #fe2e00;
  font-size: 0.75rem; // 12px
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
  const [hidden, useHidden] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [change, setChange] = useState(false);

  // disabled를 위한 timer 함수
  const timer = startTime ? (Date.now() - startTime) / 1000 : 0; // 버튼을 누른 시간 - 현재시간을 초단위로 계산 = timer

  useEffect(() => {
    if (timer > 0 && timer <= 20) {
      setChange(true);
    } else if (timer < 1 || timer > 20) {
      setChange(false);
      console.log("aaa");
    }
  }, [timer]);

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
  const handleReceiveVerificationCode = async () => {
    const getCode = await Api({
      method: "GET",
      lastUrl: `user/verification/?email=${codeEmail}`,
    });
    // 버튼이 정상작동하면 아래 div가 보임
    if (getCode.resultcode === "SUCCESS") {
      useHidden(true);
      setStartTime(Date.now());
    }
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
    <Main>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputDiv>
          <Input
            width="28.125rem" // 450px
            height="3.5rem" // 56px
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
          {errors.nickname && (
            <StyleError>{errors.nickname.message}</StyleError>
          )}
        </InputDiv>
        <EmailDiv>
          <Input
            width="20rem" // 320px
            height="3.5rem" // 56px
            input="email"
            labelname="이메일"
            type="text"
            placeholder="이메일 형식을 맞춰서 입력해주세요."
            disabled={hidden}
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
            width="7.5rem" // 120px
            height="3.5rem" // 56px
            type="button"
            id="verification"
            disabled={!codeEmail || change}
            onClick={() => handleReceiveVerificationCode()}
          >
            인증번호
          </Button>
          {errors.email && <StyleError>{errors.email.message}</StyleError>}
        </EmailDiv>
        {hidden && (
          <CodeDiv>
            <CountDiv tabIndex={0}>
              <Input
                width="17rem" // 272px
                height="3rem" // 48px
                input="code"
                type="number"
                placeholder="인증번호를 입력해주세요."
                register={register("code")}
              />
              <CountDown duration={20} />
            </CountDiv>
            <Button
              width="7.5rem" // 120px
              height="3.5rem" // 56px
              type="button"
              id="check"
              disabled={!codeData}
              onClick={() =>
                handleSendVerificationCode({ email: codeEmail, code: codeData })
              }
            >
              확인
            </Button>
          </CodeDiv>
        )}
        <InputDiv>
          <Input
            width="28.125rem" // 450px
            height="3.5rem" // 56px
            input="password"
            labelname="비밀번호"
            type="password"
            placeholder="비밀번호를 8~16글자로 입력해주세요."
            register={register("password")}
          />
          {errors.password && (
            <StyleError>{errors.password.message}</StyleError>
          )}
        </InputDiv>
        <Button width="28.125rem" type="submit" id="join" name="join">
          가입하기
        </Button>
      </Form>
      <Link to="/">메인으로 가기</Link>
    </Main>
  );
}
