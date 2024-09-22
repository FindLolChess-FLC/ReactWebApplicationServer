import { ApiForm } from "../../types/Api";
import getCookie from "../getCookie";

const url = "http://127.0.0.1:8000/";

export async function Api({ data, method, lastUrl }: ApiForm) {
  try {
    const response = await fetch(url.concat(lastUrl), {
      method,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      }),
      body: data ? JSON.stringify(data) : undefined, // GET, DELETE는 body가 필요없어서 data를 사용하지 않음
    });
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // 에러 발생 시 호출하는 쪽에서 처리
  }
}
