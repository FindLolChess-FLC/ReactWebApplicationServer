import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage1 from "../assets/img/c1.jpg";
import bgImage2 from "../assets/img/c2.jpg";
import bgImage3 from "../assets/img/c3.jpg";
import arrowRightImg from "../assets/icon/arrow_button_right.svg";
import arrowLeftImg from "../assets/icon/arrow_button_left.svg";
import { Api } from "../utils/apis/Api";
import { ListForm } from "../types/List";

const Body = styled.div`
  display: flex;
  gap: 32px;
  position: relative;
`;
const ViewBox = styled.div`
  width: 64.375rem; // 1030px
  height: 28.75rem; // 460px
  position: absolute;
  left: 1060px;
  pointer-events: none;
`;
const CarouselBox = styled.div<{ orderValue: number }>`
  width: 64.375rem; // 1030px
  height: 28.75rem; // 460px
  border-radius: 1.4375rem; // 23px
  box-shadow: 0rem 0.3125rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
  overflow: hidden;
  cursor: pointer;
  order: ${({ orderValue }) => orderValue};
`;
const ImageBox = styled.div`
  height: 21.1875rem; // 339px
  overflow: hidden;
  &:hover img {
    transform: scale(1.05); // 이미지 확대
  }
`;
const BackImage = styled.img`
  width: 100%;
  height: 21.1875rem; // 339px
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
    text-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.51);
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
const PTitle = styled.p`
  font-family: "Roboto", regular;
`;
const MetaBox = styled.div`
  display: flex;
  align-items: center;
  padding: 2.75rem 2.6875rem 2.8125rem; // 44px 43px 45px
  height: 7.5625rem; // 121px
  background-color: #fff;
  font-size: 1.25rem; // 20px
  font-weight: 500;
  &:hover p {
    text-decoration: underline;
  }
`;
const Bar = styled.div<{ slide: number }>`
  position: absolute;
  top: 31.6875rem; // 507px
  left: 14.625rem; // 234px
  width: 35.125rem; // 562px
  height: 0.3125rem; // 5px
  border-radius: 999px;
  background: #c6c6c6;
  overflow: hidden;
  > div {
    width: 11.6875rem; // 187px
    height: 0.3125rem; // 5px
    border-radius: 999px;
    background: #0d0d0d;
    transform: ${({ slide }) => `translateX(${(slide - 1) * 187}px)`};
  }
`;
const ArrowRight = styled.img`
  position: absolute;
  top: 11.6875rem; // 187px
  right: -1.875rem; // -30px
  cursor: pointer;
  pointer-events: auto;
  z-index: 999;
`;
const ArrowLeft = styled.img`
  position: absolute;
  top: 11.6875rem; // 187px
  left: -1.875rem; // -30px
  cursor: pointer;
  pointer-events: auto;
  z-index: 999;
`;

export default function Carousel() {
  const [metaData, setMetaData] = useState<ListForm[] | null>(null);
  const [slide, setSlide] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const searchApi = async () => {
      const response = await Api({
        method: "GET",
        lastUrl: "meta/metasearch/",
      });
      setMetaData(response.data);
    };
    searchApi();
  }, []);

  // 캐러셀 이미지 누르면 동작
  const handleImage = () => {
    navigate("/recommend-list");
  };

  // 버튼들 : slide 값을 변경하여 슬라이드를 전환
  // 오른쪽 버튼 누르면 동작
  const handleNextSlide = () => {
    setSlide(lastSlide => (lastSlide < 3 ? lastSlide + 1 : 1)); // 3번째 슬라이드 이후 1번 슬라이드로
  };
  // 왼쪽 버튼 누르면 동작
  const handlePrevSlide = () => {
    setSlide(lastSlide => (lastSlide > 1 ? lastSlide - 1 : 3)); // 1번째 슬라이드 이전 3번 슬라이드로
  };

  // order : 변경된 slide 값을 기준으로 각 슬라이드의 순서를 결정
  const orderValues = [
    slide,
    slide === 3 ? 1 : slide + 1,
    slide === 1 ? 3 : slide - 1,
  ];

  if (!metaData) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <Body>
      {/* 캐러셀 3 */}
      <CarouselBox orderValue={orderValues[0]}>
        <ImageBox onClick={() => handleImage()}>
          <BackImage src={bgImage3} alt="캐러셀 이미지3" />
        </ImageBox>
        <MetaBox>
          <p>{metaData[2]?.meta?.title}</p>
          <div>시너지</div>
          <div>챔피언</div>
        </MetaBox>
      </CarouselBox>
      {/* 캐러셀 1 */}
      <CarouselBox orderValue={orderValues[1]}>
        <ImageBox onClick={() => handleImage()}>
          <BackImage src={bgImage1} alt="캐러셀 이미지1" />
        </ImageBox>
        <MetaBox>
          <p>{metaData[0]?.meta?.title}</p>
          <div>시너지</div>
          <div>챔피언</div>
        </MetaBox>
      </CarouselBox>
      {/* 캐러셀 2 */}
      <CarouselBox orderValue={orderValues[2]}>
        <ImageBox onClick={() => handleImage()}>
          <BackImage src={bgImage2} alt="캐러셀 이미지2" />
        </ImageBox>
        <MetaBox>
          <p>{metaData[1]?.meta?.title}</p>
          <div>시너지</div>
          <div>챔피언</div>
        </MetaBox>
      </CarouselBox>

      <ViewBox>
        <Text>
          <PTitle>&lt;TFT 시즌 13: 아케인의 세계로&gt;</PTitle>
          <h2>FIND LOL CHESS</h2>
          <h2>추천 메타 TOP3</h2>
          <p>자세히 보기&gt;</p>
        </Text>
        <ArrowRight
          src={arrowRightImg}
          alt="오른쪽"
          onClick={handleNextSlide}
        />
        <ArrowLeft src={arrowLeftImg} alt="왼쪽" onClick={handlePrevSlide} />
        <Bar slide={slide}>
          <div> </div>
        </Bar>
      </ViewBox>
    </Body>
  );
}
