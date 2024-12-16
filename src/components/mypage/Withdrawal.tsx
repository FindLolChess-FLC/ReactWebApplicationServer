import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { JoinForm } from "../../types/Join";
import { Api } from "../../utils/apis/Api";
import Input from "../common/Input";
import Button from "../common/Button";
import warningImg from "../../assets/icon/warning.svg";

const StyledButton = styled.div`
  margin: 0.5625rem 0 1.875rem; // 9px 0 30px
  > button {
    background: #ff5252;
    &:hover {
      background: #ff7575;
    }
    &:disabled {
      background: #f4f4f4;
    }
  }
`;

const StyledWarning = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem; // 12px
  width: 38.875rem; // 622px
  padding-top: 1.875rem; // 30px
  border-top: 0.0625rem solid #e5e5e5; // 1px
  color: #fe2e00;
  font-size: 0.9375rem; // 15px
  font-weight: 600;
  line-height: 1.1875rem; // 19px
`;

export default function Withdrawal() {
  const { register, handleSubmit, watch } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const passwordValue = watch("password") || "";
  const [change, setChange] = useState(true); // disabled 여부

  useEffect(() => {
    if (passwordValue?.length > 7) {
      setChange(false);
    } // 버튼 활성화
    else {
      setChange(true); // 버튼 비활성화
    }
  }, [passwordValue]);

  const onSubmit = (data: JoinForm) => {
    Api({
      bodyData: data,
      method: "DELETE",
      lastUrl: "user/deleteid/",
    });
    // 쿠키에서 토큰을 삭제하는 방법 (max-age=0으로 만료)
    document.cookie = "token=; max-age=0; path=/;";
    navigate("/");
  };

  return (
    <>
      <h1>회원 탈퇴</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            width="500px"
            input="password"
            type="password"
            placeholder="비밀번호를 8~16글자로 입력해주세요."
            register={register("password")}
          />
        </div>
        <StyledButton>
          <Button type="submit" id="save" name="save" disabled={change}>
            회원 탈퇴
          </Button>
        </StyledButton>
      </form>
      <StyledWarning>
        <img src={warningImg} alt="주의" />
        <div>
          <p>탈퇴 후 삭제되는 모든 정보든 복구할 수 없습니다.</p>
          <p>신중하게 결정해 주세요.</p>
        </div>
      </StyledWarning>
    </>
  );
}
