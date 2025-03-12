import { ApiForm } from "../../types/Api";
import getCookie from "../cookies/getCookie";

const url = process.env.REACT_APP_SITEURL;

export async function Api({ bodyData, method, lastUrl }: ApiForm) {
  const token = getCookie("token");
  try {
    const response = await fetch(url.concat(lastUrl), {
      method,
      headers: new Headers(
        token !== ""
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          : { "Content-Type": "application/json" },
      ),
      body: bodyData ? JSON.stringify(bodyData) : undefined, // GET, DELETE는 body가 필요없어서 data를 사용하지 않음
    });
    // 응답이 성공적이지 않은 경우 에러를 던짐(400, 500번대 fetch가 못 잡아줌)
    if (!response.ok) {
      const errorData = await response.json();
      // 오류가 있고 세부적인 메세지가 있을 경우? 세부적인 오류 메세지 : 전반적인 메세지
      return errorData.error?.message
        ? errorData.error.message
        : errorData.message;
    }
    return response.json();
  } catch (error) {
    // TS에서는 error의 타입이 unknown이라 지정해줘야함
    let message: string;
    if (error instanceof Error) {
      message = error.message; // 에러 메시지 가져오기
    } else {
      message = String(error); // 다른 경우에는 문자열로 변환
    }
    reportError({ message });
    console.log(error);
  }
}
