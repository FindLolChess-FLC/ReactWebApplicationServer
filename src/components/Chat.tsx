import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./common/Button";
import Input from "./common/Input";
import getCookie from "../utils/cookies/getCookie";
import three from "../assets/icon/threebutton.svg";
import { Api } from "../utils/apis/Api";

const ViewBox = styled.div`
  height: 350px;
  padding: 12px 0 12px 20px;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  line-height: 165%; /* 19.8px */
  overflow-y: auto;
`;
const OtherBox = styled.div`
  width: 294px;
  display: flex;
  flex-direction: column;
`;
const Other = styled.div`
  padding: 12px 22px;
  border-radius: 0px 14px 14px 14px;
  background: #ebebeb;
  font-size: 12px;
`;
const MineBox = styled.div`
  width: 294px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Mine = styled.div`
  padding: 12px 22px;
  border-radius: 14px 14px 0px 14px;
  background: #5661ff;
  color: #fff;
  font-size: 12px;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: #5b5b5b;
  font-size: 10px;
  > h3 {
    font-size: 11px;
    font-weight: 500;
  }
`;
const ThreeButton = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  > img {
    padding-left: 6px;
    padding-bottom: 6px;
  }
  &:hover {
    background: #e1e1e1;
  }
`;

const Form = styled.form`
  height: 70px;
  padding: 5px 20px;
  display: flex;
  gap: 7px;
  align-items: flex-end;
  border-top: 1px solid #c9c9c9;
`;

export default function Chat(id: any) {
  const { register, handleSubmit } = useForm();

  const token = getCookie("token");
  const [content, setContent] = useState();

  const onSubmit = (data: any) => {
    Api({
      bodyData: { ...id, ...data },
      method: "POST",
      lastUrl: "meta/writecomment/",
    });
    setContent(data.content);
  };

  return (
    <>
      <ViewBox>
        <OtherBox>
          <Information>
            <h3>이름</h3>
            <p>2025.00.00</p>
          </Information>
          <Other>상대 채팅 디자인</Other>
        </OtherBox>
        <MineBox>
          <Information>
            <p>2025.00.00</p>
            <ThreeButton>
              <img src={three} alt="햄버거 버튼" />
            </ThreeButton>
          </Information>
          <Mine>{content}</Mine>
        </MineBox>
      </ViewBox>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* 기본 */}
        <Input
          width="233px"
          height="34px"
          input="chat"
          type="text"
          placeholder="댓글을 입력해주세요."
          register={register("content")}
          // disabled={}
        />
        {/* 수정중 */}
        {/* <Input
          width="233px"
          height="34px"
          input="edit"
          type="text"
          labelname="수정 중.."
          register={register("content")}
          // disabled={}
        /> */}
        <Button
          width="53px"
          height="34px"
          id="chat"
          type="submit"
          // disabled=
          // onClick={() =>}
        >
          등록
        </Button>
      </Form>
    </>
  );
}
