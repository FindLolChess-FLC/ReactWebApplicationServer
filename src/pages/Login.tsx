import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useUserInput from "../hooks/useUserInput";
import Input from "../components/common/Input";
import { Api } from "../utils/apis/Api";
import setCookie from "../utils/setCookie";
import { LoginForm } from "../types/Login";
import Button from "../components/common/Button";

export default function Login() {
  // useUserInput에서 input validation schema
  const loginSchema = useUserInput();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    navigate("/");
  };

  return (
    <div>
      <h1>Logo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          input="email"
          labelname="이메일"
          type="text"
          placeholder="이메일 형식을 맞춰서 입력해주세요."
          register={register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          input="password"
          labelname="비밀번호"
          type="password"
          placeholder="비밀번호를 8~16글자로 입력해주세요."
          register={register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit" id="login" name="login">
          이메일로 로그인
        </Button>
      </form>
      <div>
        <p>소셜 로그인하기</p>
        <button type="button">K</button>
        <button type="button">N</button>
        <button type="button">G</button>
      </div>
      <span>
        아직 FLC 회원이 아니세요? <Link to="/join">회원가입 하기</Link>
      </span>
    </div>
  );
}
