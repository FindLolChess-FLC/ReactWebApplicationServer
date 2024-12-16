import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useUserInput from "../../hooks/useUserInput";
import { JoinForm } from "../../types/Join";
import { Api } from "../../utils/apis/Api";
import Input from "../common/Input";
import Button from "../common/Button";

const StyledButton = styled.div`
  margin-top: 0.5625rem; // 9px
`;

export default function ChangeNickname() {
  // useUserInput에서 input validation schema
  const mypageSchema = useUserInput().pick(["nickname"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onBlur", resolver: yupResolver(mypageSchema) });

  const navigate = useNavigate();
  const nicknameValue = watch("nickname") || "";
  const [change, setChange] = useState(true); // disabled 여부

  useEffect(() => {
    if (nicknameValue?.trim().length > 1 && nicknameValue?.trim().length < 13) {
      setChange(false);
    } // 버튼 활성화
    else {
      setChange(true); // 버튼 비활성화
    }
  }, [nicknameValue]);

  const onSubmit = (data: JoinForm) => {
    Api({
      bodyData: data,
      method: "PATCH",
      lastUrl: "user/updateinfo/",
    });
    navigate("/");
  };

  return (
    <>
      <h1>닉네임 변경</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            width="500px"
            input="nickname"
            type="text"
            placeholder="변경하실 닉네임을 2~12글자로 입력해주세요."
            register={register("nickname")}
          />
          {errors.nickname && <h3>{errors.nickname.message}</h3>}
        </div>
        <StyledButton>
          <Button type="submit" id="save" name="save" disabled={change}>
            변경사항 저장
          </Button>
        </StyledButton>
      </form>
    </>
  );
}