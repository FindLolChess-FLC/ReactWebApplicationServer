import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import Header from "../components/containers/Header";
import Carousel from "../components/Carousel";
import FastBox from "../components/FastBox";
import Meta from "../components/common/Meta";
import Footer from "../components/containers/Footer";
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
  width: 1004px;
  height: 703px;
  background-color: #fff;
  box-shadow: 0px 7.657px 14.357px 0px rgba(112, 144, 176, 0.1);
`;
const SubTitle = styled.div`
  display: flex;
  width: 1004px;
  height: 163px;
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
            <FastBox />
          </Fast>
          {/* {metaData && metaData.length > 0 ? (
            <Meta metaData={metaData} />
          ) : (
            // 로딩
            <Skeleton
              height="550px"
              width="1004px"
              baseColor="#DCDCDC"
              borderRadius="27px"
            />
          )} */}
        </Contents>
      </ContentsBox>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
