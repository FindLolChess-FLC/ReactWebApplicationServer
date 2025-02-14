import styled from "styled-components";
import chessImg from "../assets/icon/chess.svg";
import blackImg from "../assets/icon/heart_black.svg";
import redImg from "../assets/icon/heart_red.svg";
import likeImg from "../assets/icon/like.svg";
import dislikeImg from "../assets/icon/dislike.svg";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const SynergyBox = styled.ul`
  display: flex;
  gap: 3px;
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
const Title = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-left: 36px;
  height: 66px;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
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
  row-gap: 5px; // 줄과 줄 사이 간격
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
  font-size: 15px;
  font-weight: 400;
  padding: 14px 19px;
  > h4 {
    font-size: 14px;
    font-weight: 500;
  }
`;
const LikeButton = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  padding-top: 6px;
  > img {
    cursor: pointer;
  }
`;
export default function Detail() {
  const champions = [];
  for (let i = 0; i < 28; i += 1) {
    champions.push(
      <ChessChampion key={i}>
        <img src={chessImg} alt="기본 이미지" />
      </ChessChampion>,
    );
  }

  return (
    <Body>
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
          <Title>
            <img src={blackImg} alt="빈하트" />
            초반 빌드 레넥톤 워윅
          </Title>
          <Line />
          <ChampionContents>{champions}</ChampionContents>
        </ChessBox>
        <Comment>
          <CommentTitle>
            <h4>덱이 마음에 드셨나요?</h4>
            <LikeButton>
              <img src={likeImg} alt="좋아요" />
              <img src={dislikeImg} alt="싫어요" />
              100%
            </LikeButton>
          </CommentTitle>
        </Comment>
      </Contents>
    </Body>
  );
}
