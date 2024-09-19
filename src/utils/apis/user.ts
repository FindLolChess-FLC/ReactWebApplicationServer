const url = "http://127.0.0.1:8000/user/";

type SignupForm = {
  email: string;
  password: string;
  name: string;
};

type SigninForm = {
  email: string;
  password: string;
};

// 회원가입 URL
export async function signupUser(userData: SignupForm) {
  try {
    const response = await fetch(url.concat("signup/"), {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      // 올바르지 않은 응답 시 전부 error 취급
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // 성공 시 반환 데이터
  } catch (error) {
    console.error("Error:", error);
    throw error; // 에러 발생 시 호출하는 쪽에서 처리
  }
}

// 로그인 URL
export async function signinUser(userData: SigninForm) {
  try {
    const response = await fetch(url.concat("signin/"), {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      // 올바르지 않은 응답 시 전부 error 취급
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // response는 promise타입 -> data는 json
    return data; // 성공 시 반환 데이터
  } catch (error) {
    console.error("Error:", error);
    throw error; // 에러 발생 시 호출하는 쪽에서 처리
  }
}

// 로그아웃 URL
export async function signoutUser(userData: SigninForm) {
  try {
    const response = await fetch(url.concat("signout/"), {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer Token",
      }),
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error; // 에러 발생 시 호출하는 쪽에서 처리
  }
}
