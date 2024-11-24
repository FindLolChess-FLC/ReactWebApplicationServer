import styled from "styled-components";
import { Link } from "react-router-dom";
import Footer from "../components/containers/Footer";
import Header from "../components/containers/Header";
import bgImage from "../assets/img/c1.jpg";
import arrowRightImg from "../assets/icon/arrow_button_right.svg";
import arrowLeftImg from "../assets/icon/arrow_button_left.svg";
import arrowImg from "../assets/icon/arrow_right.svg";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 4.5rem; // 72px
  background-color: #ececee;
`;

const Carousel = styled.div`
  position: relative;
`;
const CarouselBox = styled.div`
  width: 60.1875rem; // 963px
  height: 26.875rem; // 430px
  border-radius: 33px;
  border: 1px solid #000;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;
const ImageBox = styled.div`
  height: 19.8125rem; // 317px;
  background: url(${bgImage}) no-repeat top center / cover;
`;
const Text = styled.div`
  padding: 5.625rem 2.8125rem 3.75rem; // 90px 45px 60px
  color: #fff;
  font-size: 1.3125rem; // 21px
  font-weight: 400;
  > h2 {
    font-size: 2.875rem; // 46px
    font-weight: 600;
    margin: 0.6875rem 0; // 11px
  }
  > :nth-child(3) {
    color: #0ff;
  }
  > a {
    color: #fff;
    font-size: 0.9375rem; // 15px
    font-weight: 500;
  }
`;
const MetaBox = styled.div`
  display: flex;
  align-items: center;
  padding: 2.8125rem 2.6875rem 2.75rem; // 45px 43px 44px
  height: 7.0625rem; // 113px
  background-color: #fff;
  font-size: 1.25rem; // 20px
  font-weight: 500;
  cursor: pointer;
`;
const Bar = styled.div`
  position: absolute;
  top: 29.8125rem; // 477px
  left: 24.0625rem; // 385px
  width: 12rem; // 192px
  height: 0.3125rem; // 5px
  border-radius: 999px;
  background: #c6c6c6;
  overflow: hidden;
  > div {
    width: 4.25rem; // 68px
    height: 0.3125rem; // 5px
    border-radius: 999px;
    background: #0d0d0d;
  }
`;
const ArrowRight = styled.img`
  position: absolute;
  top: 11.6875rem; // 187px
  right: -1.875rem; // -30px
  cursor: pointer;
`;
const ArrowLeft = styled.img`
  position: absolute;
  top: 11.6875rem; // 187px
  left: -1.875rem; // -30px
  cursor: pointer;
`;

const Fast = styled.div``;
const SubTitle = styled.div`
  display: flex;
  gap: 0.3125rem; // 5px
  font-size: 2.5rem; // 40px
  padding: 9.4375rem 0px 5.1875rem; // 151px 0 83px
`;
const FastBox = styled.div`
  width: 60.1875rem; // 963px
  height: 26.875rem; // 430px
  border-radius: 33px;
  border: 1px solid #000;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default function Main() {
  return (
    <Body>
      <header>
        <Header />
      </header>
      <Contents>
        <Carousel>
          <CarouselBox>
            <ImageBox>
              <Text>
                <p>시즌 13 &lt;아케인의 세계로&gt;</p>
                <h2>FIND LOL CHESS</h2>
                <h2>추천 메타 TOP3</h2>
                <Link to="/meta-list">자세히 보기&gt;</Link>
              </Text>
            </ImageBox>
            <MetaBox>
              <p>[기시감] 6선봉대 갈리오</p>
            </MetaBox>
          </CarouselBox>
          <ArrowRight src={arrowRightImg} alt="오른쪽" />
          <ArrowLeft src={arrowLeftImg} alt="왼쪽" />
          <Bar>
            <div> </div>
          </Bar>
        </Carousel>
        <Fast>
          <SubTitle>
            빠른 챔피언 찾기
            <img src={arrowImg} alt="화살표" />
          </SubTitle>
          <FastBox>내용</FastBox>
        </Fast>
      </Contents>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
