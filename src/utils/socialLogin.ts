import { Api } from "./apis/Api";

export default async function socialLogin(provider: string) {
  const socialData = await Api({
    method: "GET",
    lastUrl: `oauth/${provider}/login/`,
  });
  if (socialData.resultcode === "SUCCESS") {
    window.location.href = socialData.login_url;
  }
}
