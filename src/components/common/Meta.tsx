import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useMetaContext } from "../../hooks/Context";
import heartEmptyImg from "../../assets/icon/heart_empty.svg";
import heartFillImg from "../../assets/icon/heart_fill.svg";
import arrowImg from "../../assets/icon/arrow_right_small.svg";
import restartImg from "../../assets/icon/restart.svg";
import sionImg from "../../assets/img/sion.jpg";
import useSynergyColor from "../../hooks/useSynergyColor";
import useChampionColor from "../../hooks/useChampionColor";
import { ChampionsForm, ListForm, SynergysListForm } from "../../types/List";
import usePreference from "../../hooks/usePreference";

const Table = styled.table<{ border: string }>`
  font-size: 0.875rem; // 14px
  border-radius: ${props => props.border};
  overflow: hidden;
`;

const Thead = styled.thead<{ bgColor: string }>`
  color: #fff;
  font-weight: 700;
  background: ${props => props.bgColor};
  > tr th {
    height: 58px;
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
    width: 11.25rem; // 180px
  }
  // 챔피언
  > tr th:nth-child(4) {
    width: 30rem; // 480px
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

const Tbody = styled.tbody<{ hoverColor: string; evenColor: string }>`
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
  // 별, 화살표
  > tr td:nth-child(1),
  td:nth-child(6) {
    text-align: center;
  }
  // 선호도
  > tr td:nth-child(5) {
    text-align: end;
  }
  // 시너지
  > tr td:nth-child(3) > div {
    max-width: 9.75rem; // 156px
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: center;
    gap: 0.0625rem 0; // 1px
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  // 홀수 순서일 때
  > tr:nth-child(odd) {
    background: #fff;
    &:hover {
      background: ${props => props.hoverColor};
    }
  }
  // 짝수 순서일 때
  > tr:nth-child(even) {
    background: ${props => props.evenColor};
    &:hover {
      background: ${props => props.hoverColor};
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
  width: 1.5625rem; // 25px
  height: 1.5625rem; // 25px
`;

const SynergyImg = styled.img`
  width: 0.8125rem; // 13px
  height: 0.8125rem; // 13px
  margin-top: 0.3125rem; // 5px
  margin-left: 0.34375rem; // 5.5px
`;

export default function Meta({ metaData }: any) {
  const location = useLocation();
  const border = location.pathname === "/" ? "none" : "20px 20px";
  const bgColor = location.pathname === "/" ? "#1c1a25" : "#7d92e7";
  const hoverColor = location.pathname === "/" ? "#dedede" : "#e2e2ee";
  const evenColor = location.pathname === "/" ? "#eee" : "#f1f1fb";
  const cache = `cache_buster=${Date.now()}`; // 남아 있는 캐시 데이터 지우기

  const { setPickData } = useMetaContext(); // setPickData를 통해 Meta에서 Fast로 정보 보내기

  // Fast에 다시 보낼 중복없는 챔피언 배열 만들기
  useEffect(() => {
    if (metaData?.length > 0) {
      // 챔피언 이름 중복 제거
      const getUniqueChampions = (champions: ChampionsForm[]) => {
        const championNames = new Set<string>();
        champions.forEach(champion => {
          if (champion?.champion?.name) {
            championNames.add(champion.champion.name);
          }
        });
        return Array.from(championNames);
      };

      // 모든 챔피언을 flatMap으로 가져오기
      const allChampions = metaData.flatMap(
        (item: ListForm) => item?.meta.champions || [],
      );

      // 중복 제거된 챔피언 이름을 setPickData에 전달
      const uniqueChampionNames = getUniqueChampions(allChampions).join(" ");
      setPickData(uniqueChampionNames);
    }
  }, [metaData, setPickData]);

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/detail/${id}`);
  };

  return (
    <Table border={border}>
      <Thead bgColor={bgColor}>
        <tr>
          <th> </th>
          <th>제목</th>
          <th>시너지</th>
          <th>챔피언</th>
          <th>선호도</th>
          <th> </th>
        </tr>
      </Thead>
      {/* item : meta, synerge */}
      {metaData.map((item: ListForm) => (
        <Tbody
          hoverColor={hoverColor}
          evenColor={evenColor}
          onClick={() => handleClick(item?.meta.id)}
        >
          <tr key={item?.meta.id}>
            {/* 별 */}
            <td>
              <img src={heartEmptyImg} alt="기본 별" />
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
                    ([key, value]: [string, SynergysListForm]) => {
                      const colors = useSynergyColor(
                        value.number,
                        key,
                        value.effect,
                        value.sequence,
                      );
                      // color가 undefined일 경우 SynergyColor를 렌더링하지 않음
                      return colors ? (
                        <SynergyColor key={key} color={colors}>
                          <SynergyImg
                            src={value.img_src}
                            alt={`${key} 시너지 무늬`}
                          />
                        </SynergyColor>
                      ) : null;
                    },
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
                      src={
                        data.champion.name === "사이온"
                          ? sionImg
                          : `${data.champion.img.img_src}?${cache}`
                      }
                      alt="챔피언"
                      color={useChampionColor(
                        data.champion.price,
                        data.champion.name,
                      )}
                    />
                    <p>{data.champion.name}</p>
                  </div>
                ))}
            </td>
            {/* 선호도 */}
            <td>
              <h2>
                {usePreference(item?.meta.like_count, item?.meta.dislike_count)}
                %
              </h2>
            </td>
            {/* 화살표 */}
            <td>
              <img src={arrowImg} alt="화살표" />
            </td>
          </tr>
        </Tbody>
      ))}
    </Table>
  );
}
