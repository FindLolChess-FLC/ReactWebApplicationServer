import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../utils/getCookie";

export default function Loading() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, []);
  return <> </>;
}
