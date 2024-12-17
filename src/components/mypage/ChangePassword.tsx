import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Swal from "sweetalert2";
import useUserInput from "../../hooks/useUserInput";
import { JoinForm } from "../../types/Join";
import { Api } from "../../utils/apis/Api";
import Input from "../common/Input";
import Button from "../common/Button";

const StyledButton = styled.div`
  margin-top: 3.0625rem; // 49px
`;

const CustomSwalStyle = createGlobalStyle`
  .custom-height-popup {
    width: 21.875rem; // 350px 
    height: 9.0625rem; // 145px 
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1.875rem; // 30px 
  }
  .custom-confirm-button {
    width: 4.75rem; // 76px 
  }
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
    watch,
  } = useForm({ mode: "onBlur", resolver: yupResolver(mypageSchema) });

  const navigate = useNavigate();
  const passwordValue = watch("confirmPassword") || "";
  const newPasswordValue = watch("newPassword") || "";
  const newPasswordConfirmValue = watch("newconfirmPassword") || "";
  const [change, setChange] = useState(true); // disabled 여부

  useEffect(() => {
    if (
      passwordValue?.length > 7 &&
      newPasswordValue?.length > 7 &&
      newPasswordConfirmValue?.length > 7
    ) {
      setChange(false);
    } // 버튼 활성화
    else {
      setChange(true); // 버튼 비활성화
    }
  }, [passwordValue, newPasswordValue, newPasswordConfirmValue]);

  const onSubmit = async (data: JoinForm) => {
    const passwordData = await Api({
      bodyData: { current: data.confirmPassword, new: data.newPassword },
      method: "PATCH",
      lastUrl: "user/updatepassword/",
    });
    if (passwordData.resultcode === "SUCCESS") {
      navigate("/");
    } else {
      Swal.fire({
        text: passwordData || "비밀번호 변경에 실패했습니다.",
        confirmButtonText: "닫기",
        customClass: {
          popup: "custom-height-popup", // styled-component에서 정의한 클래스 사용
          confirmButton: "custom-confirm-button",
        },
      });
    }
  };

  return (
    <>
      <CustomSwalStyle />
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
            input="newpassword"
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
            input="newconfirmpassword"
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
          <Button type="submit" id="save" name="save" disabled={change}>
            변경사항 저장
          </Button>
        </StyledButton>
      </form>
    </>
  );
}
