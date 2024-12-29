import styled from "styled-components";
import starEmptyImg from "../../assets/icon/star_empty.svg";
import starFillImg from "../../assets/icon/star_fill.svg";
import arrowImg from "../../assets/icon/arrow_right_small.svg";
import restartImg from "../../assets/icon/restart.svg";
import bronzeImg from "../../assets/icon/bronze.svg";
import silverImg from "../../assets/icon/silver.svg";
import goldImg from "../../assets/icon/gold.svg";
import chromaticImg from "../../assets/icon/chromatic.svg";
import uniqueImg from "../../assets/icon/unique.svg";
import { ChampionsForm, ListForm, SynergysListForm } from "../../types/List";

const Table = styled.table`
  font-size: 0.875rem; // 14px
  border-radius: 1.6875rem 1.6875rem 0 0; // 27px
  overflow: hidden;
`;

const Thead = styled.thead`
  color: #fff;
  font-weight: 700;
  background: #7d92e7;
  > tr th {
    height: 4rem; // 64px
    vertical-align: middle;
    text-align: left;
  }
  // 별
  > tr th:nth-child(1) {
    width: 4.375rem; // 70px
  }
  // 제목
  > tr th:nth-child(2) {
    width: 10.875rem; // 174px
  }
  // 시너지
  > tr th:nth-child(3) {
    width: 10.625rem; // 170px
  }
  // 챔피언
  > tr th:nth-child(4) {
    width: 30.625rem; // 490px
  }
  // 선호도
  > tr th:nth-child(5) {
    width: 2.5rem; // 40px
  }
  // 화살표
  > tr th:nth-child(6) {
    width: 3.75rem; // 60px
  }
`;

const Tbody = styled.tbody`
  cursor: pointer;
  > tr {
    &:hover td h2 {
      color: #5144ed;
    }
  }
  > tr td {
    height: 5.75rem; // 92px
    vertical-align: middle;
    text-align: left;
  }
  // 별, 선호도, 화살표
  > tr td:nth-child(1),
  td:nth-child(5),
  td:nth-child(6) {
    text-align: center;
  }
  // 시너지
  > tr td:nth-child(3) > div {
    max-width: 126px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: center;
    gap: 1px 0;
  }
  // 챔피언
  > tr td:nth-child(4) {
    display: flex;
    align-items: center;
    gap: 0.375rem; // 6px
  }
  // 챔피언 이름
  > tr td:nth-child(4) p {
    font-size: 0.625rem; // 10px
    width: 2.625rem; // 42px
    overflow: hidden; // 넘친 내용을 숨김
    white-space: nowrap; // 텍스트를 한 줄로 표시
    text-overflow: ellipsis; // 넘친 텍스트를 ...으로 표시
    text-align: center;
  }
  // 홀수 순서일 때
  > tr:nth-child(odd) {
    background: #fff;
    &:hover {
      background: #e2e2ee;
    }
  }
  // 짝수 순서일 때
  > tr:nth-child(even) {
    background: #f1f1fb;
    &:hover {
      background: #e2e2ee;
    }
  }
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
  margin-top: 0.4375rem; // 7px
  font-size: 0.625rem; // 10px
  font-weight: 500;
`;

const ChampionColor = styled.img<{ color: string }>`
  position: relative;
  border-radius: 0.25rem; // 4px
  width: 2.625rem; // 42px
  border: 2.5px solid ${props => props.color};
`;

const SynergyColor = styled.div<{ color: string }>`
  background: url(${props => props.color});
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
`;

const SynergyImg = styled.img`
  width: 11px;
  height: 11px;
  // margin-left: 5px;
  // margin-top: 4px;
`;

export default function Meta({ metaData }: any) {
  const cache = `cache_buster=${Date.now()}`; // 남아 있는 캐시 데이터 지우기
  console.log(metaData);

  const getChampionColor = (price: number) => {
    // 1코인
    if (price === 1) {
      return "#A19B8B";
    }
    // 2코인
    if (price === 2) {
      return "#26CE69";
    }
    // 3코인
    if (price === 3) {
      return "#2D97FF";
    }
    // 4코인
    if (price === 4) {
      return "#EE3CEE";
    }
    // 5코인
    if (price === 5) {
      return "#C13CEE";
    }
    // 6코인
    if (price === 6) {
      return "#FF98E6";
    }
    return "#CBB099";
  };

  const getSynergyColor = (number: number, key: string) => {
    if (key === "고물의왕") {
      return uniqueImg;
    }
    if (number < 4) {
      return bronzeImg;
    }
    if (number < 6) {
      return silverImg;
    }
    if (number < 8) {
      return goldImg;
    }
    if (number < 10) {
      return chromaticImg;
    }
    return bronzeImg;
  };

  return (
    <Table>
      <Thead>
        <tr>
          <th> </th>
          <th>제목</th>
          <th>시너지</th>
          <th>챔피언</th>
          <th>선호도</th>
          <th> </th>
        </tr>
      </Thead>
      <Tbody>
        {/* item : meta, synerge */}
        {metaData.map((item: ListForm) => (
          <tr key={item?.meta.id}>
            {/* 별 */}
            <td>
              <img src={starEmptyImg} alt="기본 별" />
              {/* <img src={starFillImg} alt="채워진 별" /> */}
            </td>
            {/* 제목 */}
            <td>
              <h2>{item?.meta.title}</h2>
              <RestartBox>
                <img src={restartImg} alt="리롤" />
                lvl{item?.meta.reroll_lv}
              </RestartBox>
            </td>
            {/* 시너지 */}
            <td>
              <div>
                {item?.synergys.map(synergyGroup =>
                  Object.entries(synergyGroup).map(
                    ([key, value]: [string, SynergysListForm]) => (
                      <SynergyColor
                        key={key}
                        color={getSynergyColor(value.number, key)}
                      >
                        <SynergyImg
                          src={value.img_src}
                          alt={`${key} 시너지 무늬`}
                        />
                      </SynergyColor>
                    ),
                  ),
                )}
              </div>
            </td>
            {/* 챔피언 */}
            <td>
              {item?.meta.champions &&
                item?.meta.champions.map((data: ChampionsForm) => (
                  <div key={data.location}>
                    <ChampionColor
                      src={`${data.champion.img.img_src}?${cache}`}
                      alt="챔피언"
                      color={getChampionColor(data.champion.price)}
                    />
                    <p>{data.champion.name}</p>
                  </div>
                ))}
            </td>
            {/* 선호도 */}
            <td>
              <h2>
                {(item?.meta.like_count || 0) +
                  (item?.meta.dislike_count || 0) ===
                0
                  ? 0 // like_count와 dislike_count 합이 0이면 0% 반환
                  : Math.round(
                      ((item?.meta.like_count || 0) /
                        ((item?.meta.like_count || 0) +
                          (item?.meta.dislike_count || 0))) *
                        100,
                    )}
                %
              </h2>
            </td>
            {/* 화살표 */}
            <td>
              <img src={arrowImg} alt="화살표" />
            </td>
          </tr>
        ))}
      </Tbody>
    </Table>
  );
}
