import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useUserInput from "../hooks/useUserInput";
import InputBox from "../components/InputBox";

export default function Login() {
  // useUserInput에서 input validation schema
  const loginSchema = useUserInput();
  // useForm으로 form 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  // 임시
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          inputBox="id"
          labelname="아이디"
          type="text"
          placeholder="이메일 형식을 맞춰서 입력해주세요."
          register={register("id")}
        />
        {errors.id && <p>{errors.id.message}</p>}
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
    </div>
  );
}
