import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restartImg from "../assets/icon/restart.svg";
import chessImg from "../assets/icon/chess.svg";
import blackImg from "../assets/icon/heart_black.svg";
import redImg from "../assets/icon/heart_red.svg";
import likeImg from "../assets/icon/like.svg";
import likeClickImg from "../assets/icon/like_click.svg";
import dislikeImg from "../assets/icon/dislike.svg";
import dislikeClickImg from "../assets/icon/dislike_click.svg";
import lineImg from "../assets/icon/line.svg";
import Header from "../components/containers/Header";
import Footer from "../components/containers/Footer";
import { Api } from "../utils/apis/Api";
import { ListForm, SynergysListForm } from "../types/List";
import usePreference from "../hooks/usePreference";
import useSynergyColor from "../hooks/useSynergyColor";

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
  padding: 25px 0 60px;
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
const SynergyColor = styled.div<{ color: string }>`
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
const Title = styled.div`
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
  width: 804px;
  height: 1px;
  margin-left: 17px;
  background: #c9c9c9;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 91px;
  height: 91px;
  border-radius: 7px;
  background: #dedede;
  img {
    object-fit: cover;
    border-radius: 7px;
  }
  // 2번째 줄 들여쓰기
  &:nth-child(n + 8):nth-child(-n + 14) {
    margin-left: 54px;
  }

  // 4번째 줄 들여쓰기
  &:nth-child(n + 22):nth-child(-n + 28) {
    margin-left: 54px;
  }
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
export default function Detail() {
  const { id } = useParams(); // URL에서 id 값 가져오기
  const [item, setItem] = useState<ListForm>();
  const [heart, setHeart] = useState(false); // 빈하트 false
  useEffect(() => {
    const searchApi = async () => {
      const response = await Api({
        bodyData: { data: id }, // 내 코드에선 search라는 이름이지만 DB에선 data라는 이름으로 받아서 변경해줌
        method: "POST",
        lastUrl: "meta/metasearch/",
      });
      setItem(response.data[0]);
      console.log(response.data[0]);
    };
    searchApi();
  }, []);

  const champions = []; // 챔피언 박스 배열
  for (let i = 0; i < 28; i += 1) {
    champions.push(
      <ChessChampion key={i}>
        <img src={chessImg} alt="기본 이미지" />
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
          {item?.synergys &&
            Object.entries(item?.synergys[0]).map(([key, value]) => {
              const colors = useSynergyColor(
                value.number,
                key,
                value.effect,
                value.sequence,
              );
              return colors ? (
                <Synergy key={key}>
                  <SynergyColor color={colors}>
                    <SynergyImg
                      src={value.img_src}
                      alt={`${key} 시너지 무늬`}
                    />
                  </SynergyColor>
                  <p>{value.number}</p>
                  {key}
                </Synergy>
              ) : null;
            })}
        </SynergyBox>
        <Contents>
          <ChessBox>
            <Top>
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
                {item?.meta.title}
              </Title>
              <RestartBox>
                <img src={restartImg} alt="리롤" />
                lvl{item?.meta.reroll_lv}
              </RestartBox>
            </Top>
            <Line />
            <ChampionContents>{champions}</ChampionContents>
          </ChessBox>
          <Comment>
            <CommentTitle>
              <h4>덱이 마음에 드셨나요?</h4>
              <LikeButton>
                <img src={likeImg} alt="좋아요" />
                <img src={lineImg} alt="실선" />
                {usePreference(item?.meta.like_count, item?.meta.dislike_count)}
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
