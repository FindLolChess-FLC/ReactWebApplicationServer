import * as yup from "yup"; // yup 전체를 불러오기 위해 * as 별칭 사용

export default function NumberInput() {
  // validation
  const schema = yup.object().shape({
    code: yup
      .number()
      .min(1111, "인증번호는 4자 입니다.")
      .max(9999, "인증번호는 4자 입니다.")
      .required("숫자을 입력해주세요."),
  });
  return schema;
}
