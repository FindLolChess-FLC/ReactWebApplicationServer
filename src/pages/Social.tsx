import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Social() {
  const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6rem; // 96px
    width: 43.75rem; // 700px
    height: 100vh;
    margin: auto;
    padding: 6rem; // 96px
    box-shadow: 0px 6px 15px 0px rgba(47, 47, 49, 0.25);
  `;

  const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 1.25rem; // 20px
  `;

  const Title = styled.h1`
    color: #0d0d0d;
    font-size: 2.5rem; // 40px
    font-weight: 700;
  `;

  const Description = styled.p`
    color: #0d0d0d;
    font-size: 1.125rem; // 18px
  `;

  const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2.4375rem; // 39px
  `;
  const Line = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    color: #17171b;
    font-size: 0.875rem; //14px

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #bfbfbf;
    }

    &::before {
      margin-right: 17px;
    }

    &::after {
      margin-left: 17px;
    }
  `;

  const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem; // 20px
  `;

  return (
    <Main>
      <Header>
        <Title>회원가입하기</Title>
        <Description>소셜 로그인 및 이메일로 가입할 수 있습니다.</Description>
      </Header>
      <Section>
        <ButtonDiv>
          <button type="button">카카오로 시작하기</button>
          <button type="button">네이버로 시작하기</button>
          <button type="button">Google로 시작하기</button>
        </ButtonDiv>
        <Line>또는</Line>
        <Link to="/join/email-join">
          <button type="button">이메일로 회원가입</button>
        </Link>
      </Section>
    </Main>
  );
}
