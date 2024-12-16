import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUserInput from "../../hooks/useUserInput";
import { JoinForm } from "../../types/Join";
import { Api } from "../../utils/apis/Api";
import Input from "../common/Input";
import Button from "../common/Button";

const StyledButton = styled.div`
  margin-top: 3.0625rem; // 49px
`;

export default function ChangePassword() {
  const mypageSchema = useUserInput().pick([
    "confirmPassword",
    "newPassword",
    "newconfirmPassword",
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(mypageSchema) });

  const navigate = useNavigate();

  const onSubmit = (data: JoinForm) => {
    Api({
      bodyData: { current: data.confirmPassword, new: data.newPassword },
      method: "PATCH",
      lastUrl: "user/updatepassword/",
    });
    navigate("/");
  };

  return (
    <>
      <h1>비밀번호 변경</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            width="500px"
            input="password"
            type="password"
            labelname="현재 비밀번호"
            placeholder="현재 비밀번호를 입력해주세요."
            register={register("confirmPassword")}
          />
        </div>
        <div>
          <Input
            width="500px"
            input="password"
            type="password"
            labelname="새 비밀번호"
            placeholder="비밀번호를 8~16글자로 입력해주세요."
            register={register("newPassword")}
          />
          {errors.newPassword && <h3>{errors.newPassword.message}</h3>}
        </div>
        <div>
          <Input
            width="500px"
            input="password"
            type="password"
            labelname="새 비밀번호 확인"
            placeholder="새 비밀번호를 입력해주세요."
            register={register("newconfirmPassword")}
          />
          {errors.newconfirmPassword && (
            <h3>{errors.newconfirmPassword.message}</h3>
          )}
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
