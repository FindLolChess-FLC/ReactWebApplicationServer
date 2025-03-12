import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../utils/apis/Api";
import { ChampionsForm, ListForm } from "../types/List";
import Header from "../components/containers/Header";
import Footer from "../components/containers/Footer";
import Preference from "../utils/meta/Preference";
import SynergyColor from "../utils/meta/SynergyColor";
import ChampionColor from "../utils/meta/ChampionColor";
import Tooltip from "../components/common/Tooltip";
import ItemImage from "../utils/meta/ItemImage";
import ChampionStar from "../utils/meta/ChampionStar";
import restartImg from "../assets/icon/restart.svg";
import chessImg from "../assets/icon/chess.svg";
import blackImg from "../assets/icon/heart_black.svg";
import redImg from "../assets/icon/heart_red.svg";
import likeImg from "../assets/icon/like.svg";
import likeClickImg from "../assets/icon/like_click.svg";
import dislikeImg from "../assets/icon/dislike.svg";
import dislikeClickImg from "../assets/icon/dislike_click.svg";
import lineImg from "../assets/icon/line.svg";
import moneyImg from "../assets/icon/money.svg";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
  padding: 25px 0 90px;
`;

const SynergyBox = styled.ul`
  display: flex;
  gap: 4px;
  width: 1195px;
  height: 30px;
  padding-left: 26px;
  font-size: 12px;
  font-weight: 400;
`;
const Synergy = styled.li`
  display: flex;
  position: relative;
  padding: 6px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  > p {
    padding-left: 2.5px;
    padding-right: 2px;
  }
`;
const SynergyColors = styled.div<{ color: string }>`
  background: url(${props => props.color});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 20px;
  height: 20px;
`;
const SynergyImg = styled.img`
  width: 12px;
  height: 12px;
  margin-top: 3.5px;
  margin-left: 3.5px;
`;

const Contents = styled.div`
  display: flex;
  gap: 16px;
`;
const ChessBox = styled.div`
  width: 845px;
  height: 492px;
  background: #fff;
  box-shadow: 0px 4px 36px -14px rgba(0, 0, 0, 0.05);
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 36px;
  padding-right: 28px;
  height: 66px;
`;
const Title = styled.h1`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
`;
const RestartBox = styled.div`
  display: flex;
  align-items: inherit;
  gap: 0.125rem; // 2px
  width: 49px;
  height: 23px;
  border-radius: 0.3125rem; // 5px
  border: 0.0625rem solid #000; // 1px
  padding: 4px 8px;
  margin-top: 4px;
  font-size: 11px;
  font-weight: 500;
`;
const Line = styled.div`
  width: 819px;
  height: 1px;
  margin-left: 11px;
  background: #cecece;
`;
const ChampionContents = styled.div`
  padding: 20px 35px;
  display: grid;
  grid-template-columns: repeat(7, 91px); // 고정된 칸 너비
  grid-template-rows: repeat(4, 91px); // 고정된 칸 높이
  column-gap: 10px; // 한 줄 내 칸 사이 간격
  row-gap: 8px; // 줄과 줄 사이 간격
`;
const ChessChampion = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 91px;
  height: 91px;
  border-radius: 7px;
  background: #dedede;
  // 2번째 줄 들여쓰기
  &:nth-child(n + 8):nth-child(-n + 14) {
    margin-left: 54px;
  }
  // 4번째 줄 들여쓰기
  &:nth-child(n + 22):nth-child(-n + 28) {
    margin-left: 54px;
  }
`;
const BaseImg = styled.img`
  object-fit: cover;
  border-radius: 7px;
`;
const ChampionImg = styled.div<{ $url: string; color: string }>`
  position: relative;
  overflow: hidden;
  background: url(${props => props.$url});
  background-size: cover;
  border-radius: 7px;
  width: 91px;
  height: 91px;
  border: 3px solid ${props => props.color};
`;
const StarBox = styled.div<{ color: string }>`
  width: 60px;
  height: 35px;
  transform: rotate(-45deg);
  background: ${props => props.color};
  position: absolute;
  top: -10px;
  left: -21px;
  > img {
    z-index: 5;
    position: absolute;
    top: 14px;
    left: 16px;
  }
`;
const ItemBox = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 3px;
  right: 3px;
`;
const ItemImg = styled.div<{ $url: string }>`
  position: relative;
  background: url(${props => props.$url});
  background-size: cover;
  width: 20px;
  height: 20px;
  border-radius: 8px;
  border: 1px solid #f6f6f6;
`;
const ChampionName = styled.p`
  text-align: center;
  position: absolute;
  bottom: 7.5px;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  -webkit-text-stroke-width: 0.74px;
  -webkit-text-stroke-color: #000;
`;

const Comment = styled.div`
  width: 334px;
  height: 490px;
  background: #fff;
  box-shadow: 0px 4px 36px -14px rgba(0, 0, 0, 0.05);
`;
const CommentTitle = styled.div`
  height: 66px;
  border-bottom: 1px solid #c9c9c9;
  padding: 14px 19px;
  > h4 {
    font-size: 13px;
    font-weight: 600;
    color: #000;
  }
`;
const LikeButton = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #3d3d3d;
  font-family: "Roboto";
  > img {
    cursor: pointer;
  }
`;
const TooltipImg = styled.img`
  filter: invert(1);
  width: 16px;
  height: 16px;
`;
const TooltipSynergy = styled.div`
  display: flex;
  align-items: stretch;
  gap: 4px;
  height: 18px;
  padding-bottom: 8px;
`;
const TooltipChampion = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-bottom: 2px;
  h4 {
    font-size: 12px;
    color: #f1ca76;
  }
`;
const TooltipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-bottom: 2px;
  > img {
    width: 16px;
    height: 16px;
  }
`;

export default function Detail() {
  const { id } = useParams(); // URL에서 id 값 가져오기
  const [data, setData] = useState<ListForm>(); // api에서 받아온 메타 정보
  const [heart, setHeart] = useState(false); // 빈하트 false
  const [synergyTooltip, setSynergyTooltip] = useState<any>(); // 시너지 툴팁 on/off
  const [championTooltip, setChampionTooltip] = useState<any>(); // 챔피언 툴팁 on/off
  const [itemTooltip, setItemTooltip] = useState<any>(); // 아이템 툴팁 on/off

  useEffect(() => {
    const searchApi = async () => {
      const response = await Api({
        bodyData: { data: id }, // 내 코드에선 search라는 이름이지만 DB에선 data라는 이름으로 받아서 변경해줌
        method: "POST",
        lastUrl: "meta/metasearch/",
      });
      setData(response.data[0]);
      console.log(response.data[0]);
    };
    searchApi();
  }, []);

  // 챔피언
  const champions = [];
  for (let i = 1; i < 29; i += 1) {
    const locationChampion = data?.meta.champions.find(
      (champ: ChampionsForm) => champ.location === i,
    ) as ChampionsForm | undefined;

    champions.push(
      <ChessChampion key={i}>
        {locationChampion ? (
          <>
            <ChampionImg
              $url={locationChampion.champion.img.img_src}
              color={ChampionColor(
                locationChampion.champion.price,
                locationChampion.champion.name,
              )}
              onMouseEnter={() => setChampionTooltip(locationChampion.champion)}
              onMouseLeave={() => setChampionTooltip(null)}
            >
              <StarBox
                color={ChampionColor(
                  locationChampion.champion.price,
                  locationChampion.champion.name,
                )}
              >
                {ChampionStar(
                  locationChampion.star,
                  locationChampion.champion.name,
                )}
              </StarBox>
            </ChampionImg>
            {locationChampion.item ? (
              <ItemBox>
                {locationChampion.item.map(item =>
                  item ? (
                    <ItemImg
                      $url={item.img.img_src}
                      onMouseEnter={
                        () =>
                          setItemTooltip([item, locationChampion.champion.name]) // item의 정보와 챔피언마다 다른 아이템을 나타내주기 위해 champion.name도 필요
                      }
                      onMouseLeave={() => setItemTooltip(null)}
                    >
                      {/* 호버 시 아이템 툴팁 */}
                      {itemTooltip &&
                        itemTooltip[0].name === item.name &&
                        itemTooltip[1] === locationChampion.champion.name && (
                          <Tooltip width="125px" height="70px" $left="22px">
                            <h3>{itemTooltip[0].name}</h3>
                            {itemTooltip[0].item1 ? (
                              <>
                                <TooltipItem>
                                  <img
                                    src={ItemImage(itemTooltip[0].item1)}
                                    alt="아이템1"
                                  />
                                  <p>{itemTooltip[0].item1}</p>
                                </TooltipItem>
                                <TooltipItem>
                                  <img
                                    src={ItemImage(itemTooltip[0].item2)}
                                    alt="아이템2"
                                  />
                                  <p>{itemTooltip[0].item2}</p>
                                </TooltipItem>
                              </>
                            ) : (
                              "제작 불가 아이템"
                            )}
                          </Tooltip>
                        )}
                    </ItemImg>
                  ) : null,
                )}
              </ItemBox>
            ) : null}
            <ChampionName>{locationChampion.champion.name}</ChampionName>
            {/* 호버 시 챔피언 툴팁 */}
            {championTooltip &&
              championTooltip.name === locationChampion.champion.name &&
              championTooltip.name !== "사이온" && (
                <Tooltip width="140px" height="90px" $top="91px">
                  <TooltipChampion>
                    <h3>{championTooltip.name}</h3>
                    <img src={moneyImg} alt="돈 이미지" />
                    <h4>{championTooltip.price}</h4>
                  </TooltipChampion>
                  {championTooltip.synergy.map((synergy: string) => (
                    <TooltipChampion>
                      <TooltipImg
                        src={data?.synergys[0][synergy]?.img_src}
                        alt="시너지 이미지"
                      />
                      <p>{synergy}</p>
                    </TooltipChampion>
                  ))}
                </Tooltip>
              )}
          </>
        ) : (
          <BaseImg src={chessImg} alt="기본 이미지" />
        )}
      </ChessChampion>,
    );
  }

  const handleHeart = () => {
    setHeart(!heart);
  };

  return (
    <Body>
      <header>
        <Header />
      </header>
      <Main>
        <SynergyBox>
          {/* 시너지 */}
          {data?.synergys &&
            Object.entries(data?.synergys[0]).map(([key, value]) => {
              const colors = SynergyColor(
                value.number,
                key,
                value.effect,
                value.sequence,
              );

              return colors ? (
                <Synergy
                  key={key}
                  onMouseEnter={() => setSynergyTooltip({ key, value })}
                  onMouseLeave={() => setSynergyTooltip(null)}
                >
                  <SynergyColors color={colors}>
                    <SynergyImg
                      src={value.img_src}
                      alt={`${key} 시너지 무늬`}
                    />
                  </SynergyColors>
                  <p>{value.number}</p>
                  {key}
                  {/* 호버 시 시너지 툴팁 */}
                  {synergyTooltip && synergyTooltip.key === key && (
                    <Tooltip width="328px" height="170px" $top="30px">
                      <TooltipSynergy>
                        <TooltipImg
                          src={synergyTooltip.value.img_src}
                          alt="시너지 이미지"
                        />
                        <h3>{synergyTooltip.key}</h3>
                      </TooltipSynergy>
                      <p>
                        {synergyTooltip.value.effect.replace(
                          /(?=\(\d+\))/g,
                          "\n",
                        )}
                      </p>
                    </Tooltip>
                  )}
                </Synergy>
              ) : null;
            })}
        </SynergyBox>
        <Contents>
          <ChessBox>
            <Top>
              {/* 즐겨찾기 */}
              <Title>
                <img
                  src={heart ? redImg : blackImg}
                  alt="하트"
                  onClick={handleHeart}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleHeart(); // Enter 키나 Space 키로 클릭을 대체
                    }
                  }}
                />
                {data?.meta.title}
              </Title>
              <RestartBox>
                <img src={restartImg} alt="리롤" />
                lvl{data?.meta.reroll_lv}
              </RestartBox>
            </Top>
            <Line />
            {/* 챔피언 */}
            <ChampionContents>{champions}</ChampionContents>
          </ChessBox>
          <Comment>
            <CommentTitle>
              <h4>덱이 마음에 드셨나요?</h4>
              <LikeButton>
                <img src={likeImg} alt="좋아요" />
                <img src={lineImg} alt="실선" />
                {Preference(data?.meta.like_count, data?.meta.dislike_count)}
                %
                <img src={dislikeImg} alt="싫어요" />
              </LikeButton>
            </CommentTitle>
          </Comment>
        </Contents>
      </Main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
