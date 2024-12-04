import styled from "styled-components";
import starEmptyImg from "../../assets/icon/star_empty.svg";
import starFillImg from "../../assets/icon/star_fill.svg";
import arrowImg from "../../assets/icon/arrow_right_small.svg";
import restartImg from "../../assets/icon/restart.svg";
import { ChampionsForm, ListForm } from "../../types/List";

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
  > tr th:nth-child(1) {
    width: 4.375rem; // 70px
  }
  > tr th:nth-child(2) {
    width: 10.875rem; // 174px
  }
  > tr th:nth-child(3) {
    width: 10.625rem; // 170px
  }
  > tr th:nth-child(4) {
    width: 30.625rem; // 490px
  }
  > tr th:nth-child(5) {
    width: 2.5rem; // 40px
  }
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
  > tr td:nth-child(1),
  td:nth-child(5),
  td:nth-child(6) {
    text-align: center; // 별, 선호도, 화살표 중앙 정렬
  }
  > tr td:nth-child(4) {
    display: flex;
    align-items: center;
    gap: 0.375rem; // 6px
  }
  > tr td:nth-child(4) img {
    position: relative;
    border-radius: 0.25rem; // 4px
    width: 2.625rem; // 42px
  }
  > tr td:nth-child(4) p {
    font-size: 0.625rem; // 10px
    width: 2.625rem; // 42px
    overflow: hidden; // 넘친 내용을 숨김
    white-space: nowrap; // 텍스트를 한 줄로 표시
    text-overflow: ellipsis; // 넘친 텍스트를 ...으로 표시
    text-align: center;
  }
  > tr:nth-child(odd) {
    background: #f1f1fb; // 홀수 순서일 때 색상
  }
  > tr:nth-child(even) {
    background: #fff; // 짝수 순서일 때 색상
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

export default function Meta({ metaData }: any) {
  const cache = `cache_buster=${Date.now()}`; // 남아 있는 캐시 데이터 지우기

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
            <td>시너지</td>
            {/* 챔피언 */}
            <td>
              {item?.meta.champions &&
                item?.meta.champions.map((data: ChampionsForm) => (
                  <div key={data.location}>
                    <img
                      src={`${data.champion.img.img_src}?${cache}`}
                      alt="챔피언"
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
