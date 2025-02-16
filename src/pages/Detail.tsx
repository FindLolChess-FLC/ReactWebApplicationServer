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
import { ListForm } from "../types/List";
import usePreference from "../hooks/usePreference";

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
  gap: 3px;
  width: 1195px;
  height: 30px;
  padding-left: 26px;
  font-size: 12px;
  font-weight: 400;
`;
const Synergy = styled.li`
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
  width: 100px;
  border-radius: 5px;
  background: #fff;
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
  align-items: flex-start;
  gap: 0.125rem; // 2px
  width: 2.6875rem; // 43px
  height: 1.25rem; // 20px
  border-radius: 0.3125rem; // 5px
  border: 0.0625rem solid #000; // 1px
  padding: 0.25rem 0.4375rem; // 4px 7px
  margin-top: 4px;
  font-size: 0.625rem; // 10px
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

  return (
    <Body>
      <header>
        <Header />
      </header>
      <Main>
        <SynergyBox>
          <Synergy>
            <img src="" alt="시너지" />
            <p>4</p>
            선도자
          </Synergy>
          <Synergy>
            <img src="" alt="시너지" />
            <p>8</p>
            마법사
          </Synergy>
          <Synergy>
            <img src="" alt="시너지" />
            <p>3</p>
            정복자
          </Synergy>
        </SynergyBox>
        <Contents>
          <ChessBox>
            <Top>
              <Title>
                <img src={blackImg} alt="빈하트" />
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
