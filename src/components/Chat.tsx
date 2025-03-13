import styled from "styled-components";
import Button from "./common/Button";
import Input from "./common/Input";

const Body = styled.div`
  padding: 12px 21px;
`;
const Form = styled.form`
  display: flex;
  gap: 7px;
  align-items: center;
`;

export default function Chat() {
  return (
    <Body>
      <div>상대편 채팅 디자인</div>
      <div>내 채팅 디자인</div>
      <Form>
        <Input
          width="233px"
          height="34px"
          input="chat"
          type="text"
          placeholder="댓글을 입력해주세요."
          // disabled={}
        />
        <Button
          width="53px"
          height="34px"
          id="chat"
          type="submit"
          // disabled={}
          // onClick={() =>}
        >
          등록
        </Button>
      </Form>
    </Body>
  );
}
