import styled from "styled-components";
import Header from "../components/containers/Header";
import Footer from "../components/containers/Footer";
import mypageImg from "../assets/img/mypage.png";

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
  height: 80vh;
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
          <aside>
            <ul>
              <li>닉네임 변경</li>
              <li>비밀번호 변경</li>
              <li>회원탈퇴</li>
            </ul>
          </aside>
        </Contents>
      </main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
