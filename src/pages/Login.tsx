import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useUserInput from "../hooks/useUserInput";
import InputBox from "../components/InputBox";
import { signinUser } from "../apis/user";

export default function Login() {
  // useUserInput에서 input validation schema
  const loginSchema = useUserInput();
  // useForm으로 form 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(loginSchema) });
  // 임시
  const onSubmit = async (data: any) => {
    const loginData = await signinUser(data);
    console.log(loginData.access); // 토큰이 있는 장소
    document.cookie = `token=${loginData.access}; max-age=86400 httpOnly`; // 24시간 뒤 쿠키 삭제
  };
  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          inputBox="email"
          labelname="아이디"
          type="text"
          placeholder="이메일 형식을 맞춰서 입력해주세요."
          register={register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <InputBox
          inputBox="password"
          labelname="비밀번호"
          type="text"
          placeholder="비밀번호를 8~16글자로 입력해주세요."
          register={register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">로그인</button>
      </form>
      <a href="/join">회원가입 하러가기</a>
    </div>
  );
}
