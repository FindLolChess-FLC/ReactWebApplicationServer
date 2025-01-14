import styled from "styled-components";
import { useEffect, useState } from "react";
import { Api } from "../utils/apis/Api";
import { ChampionDataForm } from "../types/ChampionData";
import useChampionColor from "../hooks/useChampionColor";

const Body = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  > li {
    height: 86px;
    display: flex;
    align-items: center;
    gap: 57px;
  }
`;
const LineColor = styled.div<{ bgcolor: string }>`
  width: 4px;
  height: 84px;
  background: ${props => props.bgcolor};
`;
const ChampionList = styled.div`
  display: flex;
  gap: 15px;
`;
const Champion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  > p {
    width: 45px;
    font-size: 10px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const ChampionImg = styled.img<{ color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 0.25rem; // 4px
  border: 2.5px solid ${props => props.color};
`;
export default function FastBox() {
  const [championData, setChampionData] = useState([]);
  const [groupPrice, setGroupPrice] = useState<number[]>([]);
  useEffect(() => {
    const championApi = async () => {
      const response = await Api({
        method: "GET",
        lastUrl: "meta/championsearch/",
      });
      setChampionData(response.data);
      // 그룹화에 사용할 price 목록 설정
      const prices = response.data.map((item: ChampionDataForm) => item.price);
      setGroupPrice(Array.from(new Set(prices))); // 중복 제거
    };
    championApi();
  }, []);

  return (
    <Body>
      {groupPrice &&
        groupPrice.map(price => (
          <li>
            <LineColor bgcolor={useChampionColor(price)}> </LineColor>
            <ChampionList>
              {championData
                .filter(
                  (item: ChampionDataForm) =>
                    item.price === price && item.name !== "사이온",
                )
                .map((item: ChampionDataForm) => (
                  <Champion>
                    <ChampionImg
                      src={item?.img.img_src}
                      alt="챔피언"
                      color={useChampionColor(item.price)}
                    />
                    <p>{item?.name}</p>
                  </Champion>
                ))}
            </ChampionList>
          </li>
        ))}
    </Body>
  );
}
