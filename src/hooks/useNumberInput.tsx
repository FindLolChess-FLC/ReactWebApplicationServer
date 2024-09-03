import * as yup from "yup"; // yup 전체를 불러오기 위해 * as 별칭 사용

export default function useNumberInput() {
  // validation
  const schema = yup.object().shape({
    emailNumber: yup
      .number()
      .min(1, "인증번호는 4자 입니다.")
      .max(4, "인증번호는 4자 입니다.")
      .required("숫자을 입력해주세요."),
  });
  return schema;
}
