import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import useUserInput from "../hooks/useUserInput";
import Input from "../components/common/Input";
import { Api } from "../utils/apis/Api";
import setCookie from "../utils/setCookie";
import { LoginForm } from "../types/Login";
import Button from "../components/common/Button";
import kakaoImg from "../assets/icon/kakao_round.svg";
import naverImg from "../assets/icon/naver_round.svg";
import googleImg from "../assets/icon/google_round.svg";
import socialLogin from "../utils/socialLogin";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.375rem; // 54px
  width: 43.75rem; // 700px
  height: 100vh;
  margin: auto;
  justify-content: center;
  box-shadow: 0px 6px 15px 0px rgba(47, 47, 49, 0.25);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.125rem; // 18px
`;

const Title = styled.h1`
  color: #5144ed;
  text-align: center;
  font-size: 3.125rem; // 40px
  font-weight: 800;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextSpan = styled.span`
  color: #333;
  font-size: 0.875rem; //14px
  font-weight: 500;
`;

const StyleError = styled.p`
  color: #fe2e00;
  font-size: 0.75rem; // 12px
  font-weight: 300;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem; // 20px
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5rem; // 24px;
  margin: auto;
`;

const Img = styled.img`
  cursor: pointer;
`;

export default function Login() {
  // useUserInput에서 input validation schema
  const loginSchema = useUserInput();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur", resolver: yupResolver(loginSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    const loginData = await Api({
      bodyData: data,
      method: "POST",
      lastUrl: "user/signin/",
    });
    console.log(loginData.access); // 토큰이 있는 장소
    setCookie("token", loginData.access, 24); // 24시간 뒤 쿠키 삭제
    if (loginData.resultcode === "SUCCESS") {
      navigate("/");
    } else {
      reset();
      Swal.fire({
        icon: "error",
        title: "로그인에 실패했습니다.",
        toast: true,
        timer: 3000,
        showConfirmButton: false,
        position: "top",
      });
    }
  };

  return (
    <Body>
      <Title>LOGO</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputDiv>
          <Input
            input="email"
            labelname="이메일"
            type="text"
            placeholder="이메일 형식을 맞춰서 입력해주세요."
            register={register("email")}
          />
          {errors.email && <StyleError>{errors.email.message}</StyleError>}
        </InputDiv>
        <InputDiv>
          <Input
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
        <Button type="submit" id="login" name="login">
          이메일로 로그인
        </Button>
      </Form>
      <Section>
        <TextSpan>소셜 로그인하기</TextSpan>
        <ImgDiv>
          <Img
            src={kakaoImg}
            alt="카카오 이미지"
            onKeyDown={() => socialLogin("kakao")}
            onClick={() => socialLogin("kakao")}
          />
          <Img
            src={naverImg}
            alt="네이버 이미지"
            onKeyDown={() => socialLogin("naver")}
            onClick={() => socialLogin("naver")}
          />
          <Img
            src={googleImg}
            alt="구글 이미지"
            onKeyDown={() => socialLogin("google")}
            onClick={() => socialLogin("google")}
          />
        </ImgDiv>
      </Section>
      <TextSpan>
        아직 FLC 회원이 아니세요? <Link to="/join">회원가입 하기</Link>
      </TextSpan>
    </Body>
  );
}
