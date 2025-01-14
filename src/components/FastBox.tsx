import styled from "styled-components";
import { useEffect, useState } from "react";
import { Api } from "../utils/apis/Api";
import { ChampionDataForm } from "../types/ChampionData";
import useChampionColor from "../hooks/useChampionColor";

const Body = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  > li {
    height: 90px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
const LineColor = styled.div<{ bgcolor: string }>`
  width: 5px;
  height: 86px;
  background: ${props => props.bgcolor};
`;
const ChampionList = styled.div`
  display: flex;
  gap: 15px;
  padding: 16px 48px 9px;
  width: 978px;
  border-bottom: 1px solid #d9d9d9;
`;
const Champion = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  > p {
    width: 50px;
    font-size: 11px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:hover .tooltip {
    display: block;
  }
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  bottom: -10%; // 챔피언 이름 위에 툴팁 표시
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background: #333;
  color: #fff;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
`;
const ChampionImg = styled.img<{ color: string }>`
  width: 49px;
  height: 49px;
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
      const prices = response.data.map((item: ChampionDataForm) => item.price);
      setGroupPrice(Array.from(new Set(prices))); // 중복 제거
    };
    championApi();
  }, []);

  return (
    <Body>
      {groupPrice &&
        groupPrice.map(price => (
          <li key={price}>
            <LineColor bgcolor={useChampionColor(price)}> </LineColor>
            <ChampionList>
              {championData
                .filter(
                  (item: ChampionDataForm) =>
                    item.price === price && item.name !== "사이온",
                )
                .map((item: ChampionDataForm) => (
                  <Champion key={item?.name}>
                    <ChampionImg
                      src={item?.img.img_src}
                      alt="챔피언"
                      color={useChampionColor(item.price)}
                    />
                    <p>{item?.name}</p>
                    <Tooltip className="tooltip">{item?.name}</Tooltip>
                  </Champion>
                ))}
            </ChampionList>
          </li>
        ))}
    </Body>
  );
}
