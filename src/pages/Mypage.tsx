import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import Header from "../components/containers/Header";
import Footer from "../components/containers/Footer";
import mypageImg from "../assets/img/mypage.png";
import nicknameImg from "../assets/icon/mypage1.svg";
import passwordImg from "../assets/icon/mypage2.svg";
import userImg from "../assets/icon/mypage3.svg";
import Input from "../components/common/Input";
import useUserInput from "../hooks/useUserInput";
import Button from "../components/common/Button";
import { Api } from "../utils/apis/Api";
import { JoinForm } from "../types/Join";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageBox = styled.div`
  overflow: hidden;
  width: 100%;
  height: 9.875rem; // 158px
  background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%);
`;

const DivBox = styled.div`
  margin: auto;
  display: flex;
  position: relative;
  width: 90rem; // 1440px
  height: 9.875rem; // 158px
`;

const Text = styled.div`
  position: absolute;
  top: 3.4375rem; // 55px
  left: 34.375rem; // 550px
  font-size: 3.0625rem; // 49px
  font-weight: 700;
  color: #fff;
`;

const Image = styled.img`
  position: absolute;
  top: -6.25rem; // -100px
  right: 17.5rem; // 280px
  width: 25rem; // 400px
  height: 25rem; // 400px
`;

const Contents = styled.div`
  margin: auto;
  display: flex;
  width: 1440px;
  height: 70vh;
`;

const Aside = styled.aside`
  position: relative;
  width: 380px;
  height: 100%;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.15);
  > ul {
    position: absolute;
    top: 48px;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  > ul li {
    width: 218px;
    height: 41px;
    padding: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    &:hover {
      background: #f4f4f4;
    }
    > ul li h3 {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

const Section = styled.section`
  padding: 50px;
  > h1 {
    font-size: 36px;
    font-weight: 500;
  }
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 45px 0 11px;
`;
const StyleError = styled.p`
  color: #fe2e00;
  font-size: 0.75rem; // 12px
  font-weight: 300;
`;

export default function MyPage() {
  return (
    <Body>
      <header>
        <Header />
      </header>
      <main>
        <ImageBox>
          <DivBox>
            <Text>
              <h1>마이페이지</h1>
            </Text>
            <Image src={mypageImg} alt="마이페이지 이미지" />
          </DivBox>
        </ImageBox>
        <Contents>
          <Aside>
            <ul>
              <li>
                <img src={nicknameImg} alt="닉네임" />
                <h3>닉네임 변경</h3>
              </li>
              <li>
                <img src={passwordImg} alt="비밀번호" />
                <h3>비밀번호 변경</h3>
              </li>
              <li>
                <img src={userImg} alt="회원탈퇴" />
                <h3>회원탈퇴</h3>
              </li>
            </ul>
          </Aside>
          <Section>
            <h1>닉네임 변경</h1>
          </Section>
        </Contents>
      </main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
