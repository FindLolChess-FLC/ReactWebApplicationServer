import styled from "styled-components";
import Footer from "../components/containers/Footer";
import Header from "../components/containers/Header";
import Carousel from "../components/Carousel";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContents = styled.main`
  flex: 1;
  background-color: #f0f0f0;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2.8125rem; // 45px
`;

const Fast = styled.div``;
const SubTitle = styled.div`
  display: flex;
  gap: 0.3125rem; // 5px
  font-size: 1.875rem; // 30px
  padding: 8.125rem 0rem 2.8125rem; // 130px 0 45px
`;
const FastBox = styled.div`
  width: 60.1875rem; // 963px
  height: 26.875rem; // 430px
  border-radius: 1.4375rem; // 23px
  border: 0.0625rem solid #000; // 1px
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0rem 0.3125rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
`;

export default function Main() {
  return (
    <Body>
      <header>
        <Header />
      </header>
      <MainContents>
        <Contents>
          <Carousel />
          <Fast>
            <SubTitle>빠른 챔피언 찾기</SubTitle>
            <FastBox>~~~준비중~~</FastBox>
          </Fast>
        </Contents>
      </MainContents>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
