import styled from "styled-components";
import starEmptyImg from "../../assets/icon/star_empty.svg";
import starFillImg from "../../assets/icon/star_fill.svg";
import arrowImg from "../../assets/icon/arrow_right_small.svg";
import restartImg from "../../assets/icon/restart.svg";

const Table = styled.table`
  width: 60.375rem; // 966px
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
    width: 3.4375rem; // 55px
  }
  > tr th:nth-child(2) {
    width: 10.75rem; // 172px
  }
  > tr th:nth-child(3) {
    width: 10.5rem; // 168px
  }
  > tr th:nth-child(4) {
    width: 30.625rem; // 490px
  }
  > tr th:nth-child(5) {
    width: 3.125rem; // 50px
  }
  > tr th:nth-child(6) {
    width: 1.9375rem; // 31px
  }
`;

const Tbody = styled.tbody`
  cursor: pointer;
  > tr td {
    height: 5.75rem; // 92px
    vertical-align: middle;
    text-align: left;
  }
  > tr td:nth-child(1),
  td:nth-child(5) {
    text-align: center; // 별 모양, 선호도는 중앙 정렬
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

export default function Meta() {
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
        <tr>
          <td>
            <img src={starEmptyImg} alt="기본 별" />
          </td>
          <td>
            <div>제목 내용</div>
            <RestartBox>
              <img src={restartImg} alt="리롤" />
              lvl
            </RestartBox>
          </td>
          <td>시너지 내용</td>
          <td>챔피언 내용</td>
          <td>%</td>
          <td>
            <img src={arrowImg} alt="화살표" />
          </td>
        </tr>
        <tr>
          <td>
            <img src={starFillImg} alt="채워진 별" />
          </td>
          <td>
            <div>제목 내용</div>
            <RestartBox>
              <img src={restartImg} alt="리롤" />
              lvl
            </RestartBox>
          </td>
          <td>시너지 내용</td>
          <td>챔피언 내용</td>
          <td>%</td>
          <td>
            <img src={arrowImg} alt="화살표" />
          </td>
        </tr>
        <tr>
          <td>
            <img src={starEmptyImg} alt="기본 별" />
          </td>
          <td>
            <div>제목 내용</div>
            <RestartBox>
              <img src={restartImg} alt="리롤" />
              lvl
            </RestartBox>
          </td>
          <td>시너지 내용</td>
          <td>챔피언 내용</td>
          <td>%</td>
          <td>
            <img src={arrowImg} alt="화살표" />
          </td>
        </tr>
        <tr>
          <td>
            <img src={starFillImg} alt="채워진 별" />
          </td>
          <td>
            <div>제목 내용</div>
            <RestartBox>
              <img src={restartImg} alt="리롤" />
              lvl
            </RestartBox>
          </td>
          <td>시너지 내용</td>
          <td>챔피언 내용</td>
          <td>%</td>
          <td>
            <img src={arrowImg} alt="화살표" />
          </td>
        </tr>
      </Tbody>
    </Table>
  );
}
