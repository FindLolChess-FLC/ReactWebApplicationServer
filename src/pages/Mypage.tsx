import styled from "styled-components";
import { useState } from "react";
import Header from "../components/containers/Header";
import Footer from "../components/containers/Footer";
import mypageImg from "../assets/img/mypage.png";
import nicknameImg from "../assets/icon/mypage1.svg";
import passwordImg from "../assets/icon/mypage2.svg";
import userImg from "../assets/icon/mypage3.svg";
import ChangeNickname from "../components/mypage/ChangeNickname";
import ChangePassword from "../components/mypage/ChangePassword";
import Withdrawal from "../components/mypage/Withdrawal";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
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
  width: 90rem; // 1440px
  height: 100%;
`;

const Aside = styled.aside`
  position: relative;
  width: 23.75rem; // 380px
  min-height: calc(100vh - 19.25rem); // 308px -> 19.25rem
  box-shadow: 0.05rem 0rem 0.15rem rgba(0, 0, 0, 0.15); // 오른쪽에만 그림자 추가
  > ul {
    position: absolute;
    top: 3rem; // 48px
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem; // 8px
  }
  > ul li {
    cursor: pointer;
    width: 13.625rem; // 218px
    height: 2.5625rem; // 41px
    padding: 0.875rem; // 14px
    display: flex;
    align-items: center;
    gap: 0.375rem; // 6px
    &:hover {
      background: #f4f4f4;
    }
    > ul li h3 {
      font-size: 0.875rem; // 14px
      font-weight: 600;
    }
  }
`;

const Section = styled.section`
  margin-bottom: 15.625rem; // 250px
  padding: 3.125rem; // 50px
  > h1 {
    font-size: 2.25rem; // 36px
    font-weight: 500;
    margin-bottom: 3.5rem; // 56px
  }
  > form div h3 {
    color: #fe2e00;
    font-size: 0.75rem; // 12px
    font-weight: 300;
    margin-bottom: 0.75rem; // 12px
  }
`;

export default function MyPage() {
  const [activeSection, setActiveSection] = useState<
    "nickname" | "password" | "withdrawal"
  >("nickname");

  const handleSectionChange = (
    section: "nickname" | "password" | "withdrawal",
  ) => {
    setActiveSection(section);
  };

  return (
    <Body>
      <header>
        <Header />
      </header>
      <Main>
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
              <li
                onKeyDown={() => handleSectionChange("nickname")}
                onClick={() => handleSectionChange("nickname")}
              >
                <img src={nicknameImg} alt="닉네임" />
                <h3>닉네임 변경</h3>
              </li>
              <li
                onKeyDown={() => handleSectionChange("password")}
                onClick={() => handleSectionChange("password")}
              >
                <img src={passwordImg} alt="비밀번호" />
                <h3>비밀번호 변경</h3>
              </li>
              <li
                onKeyDown={() => handleSectionChange("withdrawal")}
                onClick={() => handleSectionChange("withdrawal")}
              >
                <img src={userImg} alt="회원탈퇴" />
                <h3>회원탈퇴</h3>
              </li>
            </ul>
          </Aside>
          <Section>
            {activeSection === "nickname" && <ChangeNickname />}
            {activeSection === "password" && <ChangePassword />}
            {activeSection === "withdrawal" && <Withdrawal />}
          </Section>
        </Contents>
      </Main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
