import * as yup from "yup"; // yup 전체를 불러오기 위해 * as 별칭 사용

export default function useUserInput() {
  // validation
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2, "닉네임을 2글자 이상으로 입력해주세요.")
      .required("닉네임을 입력해주세요."),
    id: yup
      .string()
      .email("이메일 형식을 맞춰서 입력해주세요.")
      .required("이메일을 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호를 8~16글자로 입력해주세요.")
      .max(16, "비밀번호를 8~16글자로 입력해주세요.")
      .matches(
        /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/,
        "비밀번호에 영문, 숫자, 특수문자를 포함해주세요.",
      )
      .required("비밀번호를 입력해주세요."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "비밀번호가 일치하지 않습니다."),
  });
  return schema;
}
