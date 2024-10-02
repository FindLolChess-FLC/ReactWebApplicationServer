import { CheckDuplicateForm } from "../types/CheckDuplicate";
import { Api } from "./apis/Api";

export default async function checkDuplicate({
  key,
  value,
}: CheckDuplicateForm) {
  const result = await Api({
    bodyData: { [key]: value },
    method: "POST",
    lastUrl: `user/${key}duplicate/`,
  });
  return result;
}
