import { useEffect, useRef, useState } from "react";
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
  position: relative;
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
const Ul = styled.ul`
  position: absolute;
  top: 14px;
  right: 0px;
  z-index: 99;
  width: 60px;
  height: 49px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;
const Li = styled.li`
  padding: 7px 17px;
  text-align: center;
  color: #1f1f1f;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  &:nth-child(1) {
    border-bottom: 1px solid #eaeaea;
  }
  &:hover {
    background: #eaeaea;
  }
`;

const NoBox = styled.div`
  margin: 120px 45px 10px 30px;
  padding: 12px;
  background: #5661ff;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  line-height: 165%; /* 19.8px */
  text-align: center;
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.25);
  > p {
    font-size: 11px;
    font-weight: 400;
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
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const [messages, setMessages] = useState<ContentForm[]>([]); // content 저장
  const [nickname, setNickname] = useState("");
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(0);

  const token = getCookie("token"); // 현재 토큰

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(null);
    }
  };

  useEffect(() => {
    const chatApi = async () => {
      const responseContext = await Api({
        method: "GET",
        lastUrl: `meta/checkcomment/?meta_id=${Object.values(metaid)[0]}`,
      });
      if (responseContext?.resultcode === "SUCCESS") {
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
    };
    chatApi();
    // 어딜 클릭하던 실행
    document.addEventListener("mousedown", handleClickOutside);
    // 클린업 함수
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 토큰이 있을때만 실행
  useEffect(() => {
    if (!token) return;
    const searchApi = async () => {
      const responseNickname = await Api({
        method: "GET",
        lastUrl: "user/updateinfo/",
      });
      if (responseNickname?.resultcode === "SUCCESS") {
        setNickname(responseNickname.nickname);
      } else {
        console.log("로그인없음");
      }
    };
    searchApi();
  }, [token]);

  const onSubmit = async (data: ContentForm) => {
    try {
      if (isEdit === 0) {
        // input에 있는 값 서버로 보내기(최초)
        const sendContext = await Api({
          bodyData: { id: Object.values(metaid)[0], content: data.content },
          method: "POST",
          lastUrl: "meta/writecomment/",
        });
        // 서버에 있는 값 받아오기
        if (sendContext?.resultcode === "SUCCESS") {
          const responseContext = await Api({
            method: "GET",
            lastUrl: `meta/checkcomment/?meta_id=${Object.values(metaid)[0]}`,
          });
          if (responseContext?.resultcode === "SUCCESS") {
            setMessages(
              responseContext.data.map((text: ContentForm) => ({
                id: text.id, // id
                writer: text.writer || "", // 작성자
                content: text.content, // 내용
                date: text.date, // 날짜
              })),
            );
          }
        }
      } else {
        // input에 있는 값 서버로 보내기(수정)
        const sendContext = await Api({
          bodyData: { id: isEdit, content: data.content },
          method: "PATCH",
          lastUrl: "meta/updatecomment/",
        });
        // 서버에 있는 값 받아오기
        if (sendContext?.resultcode === "SUCCESS") {
          const responseContext = await Api({
            method: "GET",
            lastUrl: `meta/checkcomment/?meta_id=${Object.values(metaid)[0]}`,
          });
          if (responseContext?.resultcode === "SUCCESS") {
            setMessages(
              responseContext.data.map((text: ContentForm) => ({
                id: text.id, // id
                writer: text.writer || "", // 작성자
                content: text.content, // 내용
                date: text.date, // 날짜
              })),
            );
          }
        }
      }
      reset(); // input 박스 리셋
      setIsEdit(0);
    } catch {
      console.log("API 요청 중 오류 발생");
    }
  };

  const handleDropdown =
    (id: number) => (event: React.MouseEvent<HTMLImageElement>) => {
      event.stopPropagation(); // 이벤트 버블링 방지
      setIsOpen(prev => (prev === id ? null : id));
    };

  const handleDelete = (id: number) => {
    Api({
      bodyData: { id },
      method: "DELETE",
      lastUrl: "meta/deletecomment/",
    });
    setMessages(prev => prev.filter(a => a.id !== id));
    console.log(messages);
  };

  return (
    <>
      <ViewBox>
        {messages.length > 0 ? (
          messages.map(({ id, writer, content, date }) =>
            writer === nickname ? (
              <MineBox key={id}>
                {/* 내 메시지 */}
                <Information>
                  <p>{date?.toString().slice(0, 10).replace("T", " ")}</p>
                  <ThreeButton>
                    <img
                      key={id}
                      src={three}
                      alt="햄버거 버튼"
                      onClick={handleDropdown(id)}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleDropdown(id);
                        }
                      }}
                    />
                  </ThreeButton>
                  {/* 드롭다운 */}
                  {isOpen === id && (
                    <Ul ref={dropdownRef}>
                      <Li key={id} onClick={() => setIsEdit(id)}>
                        수정
                      </Li>
                      <Li key={id} onClick={() => handleDelete(id)}>
                        삭제
                      </Li>
                    </Ul>
                  )}
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
          )
        ) : (
          <NoBox>
            <h2>아직 댓글이 없어요!</h2>
            <p>가장 먼저 댓글을 달아 정보를 공유해보세요</p>
          </NoBox>
        )}
      </ViewBox>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {isEdit === 0 ? (
          <Input
            width="233px"
            height="34px"
            input="chat"
            type="text"
            placeholder="댓글을 입력해주세요."
            register={register("content", {
              required: "댓글을 입력해주세요.",
              validate: value =>
                value.trim() !== "" || "공백만 입력할 수 없습니다.",
            })}
            disabled={!token}
          />
        ) : (
          <Input
            width="233px"
            height="34px"
            input="edit"
            type="text"
            placeholder={messages.find(msg => msg.id === isEdit)?.content}
            labelname="수정 중.."
            register={register("content")}
            disabled={!token}
          />
        )}

        <Button
          width="53px"
          height="34px"
          id="chat"
          type="submit"
          disabled={!token}
        >
          등록
        </Button>
      </Form>
    </>
  );
}
