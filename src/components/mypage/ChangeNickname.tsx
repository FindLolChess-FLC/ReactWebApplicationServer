import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useUserInput from "../../hooks/useUserInput";
import { JoinForm } from "../../types/Join";
import { Api } from "../../utils/apis/Api";
import Input from "../common/Input";
import Button from "../common/Button";

const StyledButton = styled.div`
  // margin-top: 490px;
`;

export default function ChangeNickname() {
  // useUserInput에서 input validation schema
  const mypageSchema = useUserInput().pick(["nickname"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(mypageSchema) });

  const onSubmit = (data: JoinForm) => {
    Api({
      bodyData: data,
      method: "PATCH",
      lastUrl: "user/updateinfo/",
    });
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
          <Button type="submit" id="save" name="save">
            변경사항 저장
          </Button>
        </StyledButton>
      </form>
    </>
  );
}
