import styled from "styled-components";
import Footer from "../components/containers/Footer";
import Header from "../components/containers/Header";
import Carousel from "../components/Carousel";
import championBannerImg from "../assets/img/champion_banner.jpg";
import arrowFillImg from "../assets/icon/arrow_fill.svg";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const ContentsBox = styled.div`
  flex: 1;
  background-color: #f0f0f0;
`;

const Contents = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2.8125rem; // 45px
  overflow: hidden;
`;

const Fast = styled.section`
  margin-top: 108px;
  width: 911px;
  height: 924px;
  background-color: #fff;
`;
const SubTitle = styled.div`
  display: flex;
  width: 911px;
  height: 149px;
  background: url(${championBannerImg});
  background-size: cover;
`;
const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  padding: 47px 62px;
  > div {
    display: flex;
    gap: 5px;
    padding-top: 9px;
  }
  > h2 {
    font-size: 34px;
    font-weight: 600;
  }
`;
const FastBox = styled.ul``;

export default function Main() {
  return (
    <Body>
      <header>
        <Header />
      </header>
      <ContentsBox>
        <Contents>
          <Carousel />
          <Fast>
            <SubTitle>
              <Text>
                <h2>빠른 챔피언 찾기</h2>
                <div>
                  <img src={arrowFillImg} alt="화살표" />
                  <p>FIND LOL CHESS에서 시즌13 챔피언을 한눈에 확인해보세요!</p>
                </div>
              </Text>
            </SubTitle>
            <FastBox>
              <li>
                <div> </div>
                <div>사진리스트</div>
              </li>
            </FastBox>
          </Fast>
        </Contents>
      </ContentsBox>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
