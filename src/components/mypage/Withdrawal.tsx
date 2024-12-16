import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { JoinForm } from "../../types/Join";
import { Api } from "../../utils/apis/Api";
import Input from "../common/Input";
import Button from "../common/Button";
import warningImg from "../../assets/icon/warning.svg";

const StyledButton = styled.div`
  margin: 9px 0 30px;
  > button {
    background: #ff5252;
    &:hover {
      background: #ff7575;
    }
  }
`;

const StyledWarning = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  width: 622px;
  padding-top: 30px;
  border-top: 1px solid #e5e5e5;
  color: #fe2e00;
  font-size: 15px;
  font-weight: 600;
  line-height: 19px;
`;

export default function Withdrawal() {
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();

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
          <Button type="submit" id="save" name="save">
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
