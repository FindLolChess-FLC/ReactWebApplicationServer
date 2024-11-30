import styled from "styled-components";
import Header from "../components/containers/Header";
import Meta from "../components/common/Meta";
import Footer from "../components/containers/Footer";
import recommendImg from "../assets/img/recommend.png";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageBox = styled.div`
  height: 15.5rem; // 248px
  color: #fff;
  background: url(${recommendImg}) no-repeat center center / cover;
`;
const Text = styled.div`
  padding: 4.75rem 12.375rem; // 76px 198px
  font-size: 1.4375rem; // 23px
  font-weight: 500;
  > h1 {
    font-size: 3.4375rem; // 55px
    font-weight: 700;
    padding-bottom: 1.75rem; // 28px
  }
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8125rem; // 29px
  width: 100vw;
  padding: 4.4375rem; // 71px
  background-color: #f4f4f4;
`;

const SubTitle = styled.div`
  width: 60.375rem; // 966px
  font-size: 2.25rem; // 36px
  padding: 0 0 1.4375rem 0.6875rem; // 0 0 23px 11px
  border-bottom: 1px solid #8d8d8d;
`;

export default function RecommendList() {
  return (
    <Body>
      <header>
        <Header />
      </header>
      <main>
        <ImageBox>
          <Text>
            <h1>시즌 13 추천메타</h1>
            <p>FIND LOL CHESS에서 최신 정보를 확인해보세요!</p>
          </Text>
        </ImageBox>
        <Contents>
          <SubTitle>추천 메타</SubTitle>
          <Meta />
        </Contents>
      </main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
