import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import setCookie from "../utils/cookies/setCookie";

export default function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const access = queryParams.get("token");
  useEffect(() => {
    if (access) {
      setCookie("token", access, 24);
      navigate("/");
    }
  }, []);
  return <> </>;
}
