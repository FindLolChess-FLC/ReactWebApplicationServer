import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./common/Button";
import Input from "./common/Input";
import getCookie from "../utils/cookies/getCookie";
import three from "../assets/icon/threebutton.svg";
import { Api } from "../utils/apis/Api";
import { ContentForm } from "../types/Content";

const ViewBox = styled.div`
  height: 350px;
  padding: 12px 0 12px 20px;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  overflow-y: auto;
`;
const OtherBox = styled.div`
  width: 294px;
  display: flex;
  gap: 3px;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0;
`;
const Other = styled.div`
  padding: 12px 22px;
  border-radius: 0px 14px 14px 14px;
  background: #ebebeb;
  font-size: 12px;
  line-height: 165%; /* 19.8px */
`;
const MineBox = styled.div`
  width: 294px;
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: flex-end;
  padding: 4px 0;
`;
const Mine = styled.div`
  padding: 12px 22px;
  border-radius: 14px 14px 0px 14px;
  background: #5661ff;
  color: #fff;
  font-size: 12px;
  line-height: 165%; /* 19.8px */
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: #5b5b5b;
  font-size: 9px;
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
    padding-top: 3px;
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

export default function Chat(metaid: any) {
  const { register, handleSubmit, reset } = useForm<ContentForm>();
  const [messages, setMessages] = useState<ContentForm[]>([]); // content 저장
  const [nickname, setNickname] = useState("");
  const token = getCookie("token"); // 현재 토큰

  useEffect(() => {
    const searchApi = async () => {
      const [responseContext, responseNickname] = await Promise.all([
        Api({
          method: "GET",
          lastUrl: `meta/checkcomment/?meta_id=${Object.values(metaid)[0]}`,
        }),
        Api({
          method: "GET",
          lastUrl: "user/updateinfo/",
        }),
      ]);
      if (responseContext.resultcode === "SUCCESS") {
        setMessages(
          responseContext.data.map((text: ContentForm) => ({
            id: text.id, // id
            writer: text.writer || "", // 작성자
            content: text.content, // 내용
            date: text.date, // 날짜
          })),
        );
      } else {
        console.log("댓글없음");
      }
      if (responseNickname.resultcode === "SUCCESS") {
        setNickname(responseNickname.nickname);
      } else {
        console.log("로그인 안되어 있음");
      }
    };
    searchApi();
  }, []);

  const onSubmit = async (data: ContentForm) => {
    const response = await Api({
      bodyData: { ...metaid, ...data },
      method: "POST",
      lastUrl: "meta/writecomment/",
    });

    const newMessage = {
      id: response.data.id, // 서버에서 받은 ID 사용
      writer: nickname, // 현재 사용자 닉네임 사용
      content: data.content, // 입력한 메시지 내용
      date: response.data.date, // 서버에서 받은 생성 날짜
    };
    setMessages(prevMessages => [...prevMessages, newMessage]); // 로컬에 있는 메세지 추가

    reset();
  };

  return (
    <>
      <ViewBox>
        {messages.map(({ id, writer, content, date }) =>
          writer === nickname ? (
            <MineBox key={id}>
              {/* 내 메시지 */}
              <Information>
                <p>{date?.toString().slice(0, 10).replace("T", " ")}</p>
                <ThreeButton>
                  <img src={three} alt="햄버거 버튼" />
                </ThreeButton>
              </Information>
              <Mine>{content}</Mine>
            </MineBox>
          ) : (
            <OtherBox key={id}>
              {/* 상대 메시지 */}
              <Information>
                <h3>{writer}</h3>
                <p>{date?.toString().slice(0, 10).replace("T", " ")}</p>
              </Information>
              <Other>{content}</Other>
            </OtherBox>
          ),
        )}
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
