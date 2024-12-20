import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  width: 100%;
  padding: 2.8125rem; // 45px
  background-color: #f4f4f4;
`;

const Carousel = styled.div`
  position: relative;
`;
const CarouselBox = styled.div`
  width: 60.1875rem; // 963px
  height: 26.875rem; // 430px
  border-radius: 23px;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  cursor: pointer;
`;
const ImageBox = styled.div`
  height: 19.8125rem; // 317px;
  overflow: hidden;
  &:hover img {
    transform: scale(1.05); // 이미지 확대
  }
`;
const BackImage = styled.img`
  position: relative;
  width: 100%;
  height: 19.8125rem; // 317px;
  transition: transform 0.3s ease-in-out; // 부드러운 확대 애니메이션
`;
const Text = styled.div`
  position: absolute;
  top: 5.625rem; // 90px
  left: 2.8125rem; // 45px
  bottom: 3.75rem; // 60px
  z-index: 10;
  color: #fff;
  font-size: 1.3125rem; // 21px
  font-weight: 400;
  > h2 {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.51);
    font-size: 2.875rem; // 46px
    font-weight: 600;
    margin: 0.6875rem 0; // 11px
  }
  > :nth-child(2) {
    color: #9cf4fd;
  }
  > :nth-child(4) {
    color: #fff;
    font-size: 0.9375rem; // 15px
    font-weight: 500;
    text-decoration: underline;
  }
`;
const MetaBox = styled.div`
  display: flex;
  align-items: center;
  padding: 2.75rem 2.6875rem 2.8125rem; // 44px 43px 45px
  height: 7.0625rem; // 113px
  background-color: #fff;
  font-size: 1.25rem; // 20px
  font-weight: 500;
  &:hover p {
    text-decoration: underline;
  }
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
  font-size: 1.875rem; // 30px
  padding: 8.125rem 0px 2.8125rem; // 130px 0 45px
`;
const FastBox = styled.div`
  width: 60.1875rem; // 963px
  height: 26.875rem; // 430px
  border-radius: 23px;
  border: 1px solid #000;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default function Main() {
  const navigate = useNavigate();
  const handleImage = () => {
    navigate("/recommend-list");
  };
  return (
    <Body>
      <header>
        <Header />
      </header>
      <main>
        <Contents>
          <Carousel>
            <CarouselBox>
              <ImageBox onClick={() => handleImage()}>
                <BackImage src={bgImage} alt="캐러셀 이미지" />
                <Text>
                  <p>시즌 13 &lt;아케인의 세계로&gt;</p>
                  <h2>FIND LOL CHESS</h2>
                  <h2>추천 메타 TOP3</h2>
                  <p>자세히 보기&gt;</p>
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
            <FastBox>~~~준비중~~</FastBox>
          </Fast>
        </Contents>
      </main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
