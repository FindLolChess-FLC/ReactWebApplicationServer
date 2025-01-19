import styled from "styled-components";
import { useEffect, useState } from "react";
import { Api } from "../utils/apis/Api";
import { ChampionDataForm } from "../types/ChampionData";
import useChampionColor from "../hooks/useChampionColor";
import championBannerImg from "../assets/img/champion_banner.jpg";
import arrowFillImg from "../assets/icon/arrow_fill.svg";

const Body = styled.section`
  margin-top: 60px;
  margin-bottom: 35px;
  width: 1004px;
  height: 692px;
  background-color: #fff;
  box-shadow: 0px 7.657px 14.357px 0px rgba(112, 144, 176, 0.1);
`;
const SubTitle = styled.div`
  display: flex;
  width: 1004px;
  height: 152px;
  background: url(${championBannerImg});
  background-size: cover;
`;
const Text = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  padding: 47px 62px;
  > div {
    display: flex;
    gap: 5px;
    padding-top: 13px;
  }
  > h2 {
    font-size: 29px;
    font-weight: 600;
  }
`;

const FastBox = styled.ul`
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
  bottom: -10%;
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

interface ComponentProps {
  pickMeta: string;
  setPickMeta: React.Dispatch<React.SetStateAction<string>>;
}

export default function Fast({ pickMeta, setPickMeta }: ComponentProps) {
  const [championData, setChampionData] = useState([]);
  const [groupPrice, setGroupPrice] = useState<number[]>([]);
  const [selectName, setSelectName] = useState<string[]>([]);

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

  const handleClick = (name: string) => {
    setSelectName(prevNames => {
      const updatedNames = [...prevNames, name]; // 이전 값에 새 name 추가
      const names = updatedNames.join(","); // ','로 합친 문자열 생성
      sendPickMeta(names); // API 호출
      return updatedNames; // 상태 업데이트
    });
  };

  const sendPickMeta = async (names: string) => {
    const pickData = await Api({
      bodyData: { data: names },
      method: "POST",
      lastUrl: "meta/metasearch/",
    });
    if (pickData.resultcode === "SUCCESS") {
      setPickMeta(pickData.data);
    } else {
      setPickMeta("");
    }
  };

  return (
    <Body>
      <SubTitle>
        <Text>
          <h2>빠른 챔피언 찾기</h2>
          <div>
            <img src={arrowFillImg} alt="화살표" />
            <p>챔피언을 누르고 관련 메타를 확인해보세요!</p>
          </div>
        </Text>
      </SubTitle>
      <FastBox>
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
                    <Champion
                      key={item?.name}
                      onClick={() => handleClick(item?.name)}
                    >
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
      </FastBox>
    </Body>
  );
}
