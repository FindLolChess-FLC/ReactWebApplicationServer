import { Link } from "react-router-dom";
import styled from "styled-components";
import { ImageButtonProps } from "../types/ImageButton";
import kakaoImg from "../assets/icon/kakao.svg";
import naverImg from "../assets/icon/naver.svg";
import googleImg from "../assets/icon/google.svg";

export default function Social() {
  const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 692px; // 410px
    height: 100vh;
    margin: auto;
    justify-content: center;
  `;

  const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6rem; // 96px
    padding: 20%;
    width: 692px;
    height: 824px;
    border-radius: 8px;
    box-shadow:
      4px 4px 4px 0px rgba(0, 0, 0, 0.25),
      0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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

  const Article = styled.article`
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
    align-items: center;
    gap: 1.25rem; // 20px
  `;

  const ImageButton = styled.button<ImageButtonProps>`
    position: relative;
    width: 25.625rem; // 410px
    height: 3.75rem; // 60px
    background: ${props => props.bgcolor || `#fff`};
    color: ${props => props.color || `##0d0d0d`};
    border: ${props => props.border || `none`};
    border-radius: 8px;

    &:hover {
      background: ${props => props.hovercolor || `#f2f2f2`};
      border: ${props => props.hoverborder || `none`};
    }
  `;

  const Image = styled.img`
    width: 1rem; // 16px
    height: 1rem; // 16px
    position: absolute;
    top: 1.375rem; // 22px
    left: 2.25rem; // 36px
  `;
  return (
    <Body>
      <Section>
        <Header>
          <Title>회원가입하기</Title>
          <Description>소셜 로그인 및 이메일로 가입할 수 있습니다.</Description>
        </Header>
        <Article>
          <ButtonDiv>
            <ImageButton
              id="kakao"
              type="button"
              bgcolor="#fee500"
              hovercolor="#eed900"
            >
              <Image src={kakaoImg} alt="카카오 이미지" />
              Kakao로 시작하기
            </ImageButton>
            <ImageButton
              id="naver"
              type="button"
              bgcolor="#02c75a"
              color="#fff"
              hovercolor="#1cbe00"
            >
              <Image src={naverImg} alt="네이버 이미지" />
              Naver로 시작하기
            </ImageButton>
            <ImageButton
              id="google"
              type="button"
              bgcolor="#f2f2f2"
              hovercolor="#e8e7eb"
            >
              <Image src={googleImg} alt="구글 이미지" />
              Google로 시작하기
            </ImageButton>
          </ButtonDiv>
          <Line>또는</Line>
          <Link to="/join/email-join">
            <ImageButton
              id="join"
              type="button"
              border="1px solid #bfbfbf"
              hoverborder="1px solid #bfbfbf"
            >
              이메일로 회원가입
            </ImageButton>
          </Link>
        </Article>
      </Section>
    </Body>
  );
}
