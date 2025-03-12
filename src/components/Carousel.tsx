import styled, { keyframes, css } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import bgImage1 from "../assets/img/c1.jpg";
import bgImage2 from "../assets/img/c2.jpg";
import bgImage3 from "../assets/img/c3.jpg";
import arrowRightImg from "../assets/icon/arrow_button_right.svg";
import arrowLeftImg from "../assets/icon/arrow_button_left.svg";
import { Api } from "../utils/apis/Api";
import { ChampionsForm, ListForm, SynergysListForm } from "../types/List";
import ChampionColor from "../utils/meta/ChampionColor";
import SynergyColor from "../utils/meta/SynergyColor";

const Body = styled.div`
  display: flex;
  gap: 70px;
  position: relative;
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`;

const CarouselBox = styled.div<{ $order: number; $shaking: boolean }>`
  width: 970px;
  height: 405px;
  border-radius: 1.4375rem; // 23px
  box-shadow: 0rem 0.3125rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
  overflow: hidden;
  cursor: pointer;
  order: ${({ $order }) => $order};
  ${({ $shaking }) =>
    $shaking &&
    css`
      animation: ${shakeAnimation} 0.4s ease;
    `}
`;

const ImageBox = styled.div`
  height: 320px;
  overflow: hidden;
  &:hover img {
    transform: scale(1.05); // 이미지 확대
  }
`;
const BackImage = styled.img`
  width: 100%;
  height: 320px;
  transition: transform 0.3s ease-in-out; // 부드러운 확대 애니메이션
`;

const MetaBox = styled.div`
  display: flex;
  gap: 27px;
  align-items: center;
  padding: 25px 2.6875rem; // 25px 43px
  height: 85px;
  background-color: #fff;
  font-size: 1.25rem; // 20px
  font-weight: 500;
  &:hover p {
    text-decoration: underline;
  }
`;
const SynergyBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  gap: 0.0625rem 0; // 1px
`;
const SynergyColors = styled.div<{ color: string }>`
  background: url(${props => props.color});
  width: 1.5625rem; // 25px
  height: 1.5625rem; // 25px
`;
const SynergyImg = styled.img`
  width: 0.8125rem; // 13px
  height: 0.8125rem; // 13px
  margin-top: 5px;
  margin-left: 5.5px;
`;
const ChampionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem; // 6px
`;
const ChampionColors = styled.img<{ color: string }>`
  position: relative;
  border-radius: 0.25rem; // 4px
  width: 2.625rem; // 42px
  border: 2.5px solid ${props => props.color};
`;

const ViewBox = styled.div`
  width: 970px;
  height: 320px;
  position: absolute;
  left: 1040px;
  pointer-events: none;
`;
const Text = styled.div`
  position: absolute;
  top: 90px;
  left: 50px;
  z-index: 10;
  color: #fff;
  font-size: 19px;
  font-weight: 400;
  > h2 {
    text-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.51);
    font-size: 41px;
    font-weight: 600;
    margin: 0.6875rem 0; // 11px
  }
  > :nth-child(2) {
    color: #9cf4fd;
  }
  > :nth-child(4) {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
    padding: 3px;
  }
`;
const PTitle = styled.p`
  font-family: "Roboto", regular;
`;
const Bar = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  top: 424px;
  left: 50%;
  transform: translate(-50%);
`;
const Circle = styled.div<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d1d1;
  ${({ $active }) => $active && `background: #0d0d0d;`}
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
  const cache = `cache_buster=${Date.now()}`; // 남아 있는 캐시 데이터 지우기
  const [metaData, setMetaData] = useState<ListForm[] | null>(null);
  const [slide, setSlide] = useState(1);
  const navigate = useNavigate();
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const searchApi = async () => {
      const response = await Api({
        method: "GET",
        lastUrl: "meta/metasearch/?type=best",
      });
      setMetaData(response.data);
    };
    searchApi();
  }, []);

  // 캐러셀 이미지 누르면 동작
  const handleImage = () => {
    navigate("/recommend-list");
  };
  // 캐러셀 내용 누르면 동작
  const handleClick = (id: number) => {
    navigate(`/detail/${id}`);
  };

  // 버튼들 : slide 값을 변경하여 슬라이드를 전환
  // 오른쪽 버튼 누르면 동작
  const handleNextSlide = () => {
    triggerShake();
    setSlide(lastSlide => (lastSlide > 1 ? lastSlide - 1 : 3)); // 1번째 슬라이드 이전 3번 슬라이드로
  };
  // 왼쪽 버튼 누르면 동작
  const handlePrevSlide = () => {
    triggerShake();
    setSlide(lastSlide => (lastSlide < 3 ? lastSlide + 1 : 1)); // 3번째 슬라이드 이후 1번 슬라이드로
  };

  // 흔들리는 애니메이션 실행 함수
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400); // 0.4초 후 애니메이션 종료
  };

  // order : 변경된 slide 값을 기준으로 각 슬라이드의 순서를 결정
  const orderValues = [
    slide,
    slide === 3 ? 1 : slide + 1,
    slide === 1 ? 3 : slide - 1,
  ];

  if (!metaData) {
    return (
      <Skeleton
        height="429px"
        width="1030px"
        baseColor="#DCDCDC"
        borderRadius="27px"
      />
    );
  }

  return (
    <Body>
      {/* 캐러셀 3 */}
      <CarouselBox $order={orderValues[0]} $shaking={isShaking}>
        <ImageBox onClick={() => handleImage()}>
          <BackImage src={bgImage3} alt="캐러셀 이미지3" />
        </ImageBox>
        <MetaBox onClick={() => handleClick(metaData[2]?.meta?.id)}>
          <p>{metaData[2]?.meta?.title}</p>
          <SynergyBox>
            {metaData[2]?.synergys.map(synergyGroup =>
              Object.entries(synergyGroup).map(
                ([key, value]: [string, SynergysListForm]) => {
                  const colors = SynergyColor(
                    value.number,
                    key,
                    value.effect,
                    value.sequence,
                  );
                  // color가 undefined일 경우 SynergyColor를 렌더링하지 않음
                  return colors ? (
                    <SynergyColors key={key} color={colors}>
                      <SynergyImg
                        src={value.img_src}
                        alt={`${key} 시너지 무늬`}
                      />
                    </SynergyColors>
                  ) : null;
                },
              ),
            )}
          </SynergyBox>
          <ChampionBox>
            {metaData[2]?.meta?.champions &&
              metaData[2]?.meta?.champions.map((data: ChampionsForm) => (
                <div key={data.location}>
                  <ChampionColors
                    src={`${data.champion.img.img_src}?${cache}`}
                    alt="챔피언"
                    color={ChampionColor(
                      data.champion.price,
                      data.champion.name,
                    )}
                  />
                </div>
              ))}
          </ChampionBox>
        </MetaBox>
      </CarouselBox>
      {/* 캐러셀 1 */}
      <CarouselBox $order={orderValues[1]} $shaking={isShaking}>
        <ImageBox onClick={() => handleImage()}>
          <BackImage src={bgImage1} alt="캐러셀 이미지1" />
        </ImageBox>
        <MetaBox onClick={() => handleClick(metaData[0]?.meta?.id)}>
          <p>{metaData[0]?.meta?.title}</p>
          <SynergyBox>
            {metaData[0]?.synergys.map(synergyGroup =>
              Object.entries(synergyGroup).map(
                ([key, value]: [string, SynergysListForm]) => {
                  const colors = SynergyColor(
                    value.number,
                    key,
                    value.effect,
                    value.sequence,
                  );
                  // color가 undefined일 경우 SynergyColor를 렌더링하지 않음
                  return colors ? (
                    <SynergyColors key={key} color={colors}>
                      <SynergyImg
                        src={value.img_src}
                        alt={`${key} 시너지 무늬`}
                      />
                    </SynergyColors>
                  ) : null;
                },
              ),
            )}
          </SynergyBox>
          <ChampionBox>
            {metaData[0]?.meta?.champions &&
              metaData[0]?.meta?.champions.map((data: ChampionsForm) => (
                <div key={data.location}>
                  <ChampionColors
                    src={`${data.champion.img.img_src}?${cache}`}
                    alt="챔피언"
                    color={ChampionColor(
                      data.champion.price,
                      data.champion.name,
                    )}
                  />
                </div>
              ))}
          </ChampionBox>
        </MetaBox>
      </CarouselBox>
      {/* 캐러셀 2 */}
      <CarouselBox $order={orderValues[2]} $shaking={isShaking}>
        <ImageBox onClick={() => handleImage()}>
          <BackImage src={bgImage2} alt="캐러셀 이미지2" />
        </ImageBox>
        <MetaBox onClick={() => handleClick(metaData[1]?.meta?.id)}>
          <p>{metaData[1]?.meta?.title}</p>
          <SynergyBox>
            {metaData[1]?.synergys.map(synergyGroup =>
              Object.entries(synergyGroup).map(
                ([key, value]: [string, SynergysListForm]) => {
                  const colors = SynergyColor(
                    value.number,
                    key,
                    value.effect,
                    value.sequence,
                  );
                  // color가 undefined일 경우 SynergyColor를 렌더링하지 않음
                  return colors ? (
                    <SynergyColors key={key} color={colors}>
                      <SynergyImg
                        src={value.img_src}
                        alt={`${key} 시너지 무늬`}
                      />
                    </SynergyColors>
                  ) : null;
                },
              ),
            )}
          </SynergyBox>
          <ChampionBox>
            {metaData[1]?.meta?.champions &&
              metaData[1]?.meta?.champions.map((data: ChampionsForm) => (
                <div key={data.location}>
                  <ChampionColors
                    src={`${data.champion.img.img_src}?${cache}`}
                    alt="챔피언"
                    color={ChampionColor(
                      data.champion.price,
                      data.champion.name,
                    )}
                  />
                </div>
              ))}
          </ChampionBox>
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
        <Bar>
          <Circle $active={slide === 1}> </Circle>
          <Circle $active={slide === 3}> </Circle>
          <Circle $active={slide === 2}> </Circle>
        </Bar>
      </ViewBox>
    </Body>
  );
}
