import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { Api } from "../utils/apis/Api";
import { ChampionDataForm } from "../types/ChampionData";
import { useMetaContext } from "../hooks/Context";
import ChampionColor from "../utils/meta/ChampionColor";
import championBannerImg from "../assets/img/champion_banner.jpg";
import arrowFillImg from "../assets/icon/arrow_fill.svg";
import downImg from "../assets/icon/arrow_down.svg";
import checkImg from "../assets/icon/check.svg";
import resetImg from "../assets/icon/reset.svg";

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
const LineColor = styled.div<{ $bgcolor: string }>`
  width: 5px;
  height: 86px;
  background: ${props => props.$bgcolor};
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
const ChampionImg = styled.img<{ filter: string; color: string }>`
  width: 49px;
  height: 49px;
  border-radius: 0.25rem; // 4px
  border: 2.5px solid ${props => props.color};
  filter: ${props => props.filter};
  // 클릭 방지 & 비활성화 스타일 추가
  cursor: ${({ filter }) =>
    filter.includes("grayscale") ? "not-allowed" : "pointer"};
`;

const CheckImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  z-index: 2;
`;

const arrowAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(10px);
  }
  40% {
    transform: translateY(0);
  }
`;
const ScrollButton = styled.div`
  position: absolute;
  top: 1230px;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  transform: translateX(-50%);
  color: #929292;
  font-size: 14px;
  cursor: pointer;
  > img {
    width: 35px;
    height: 15px;
    filter: brightness(60%);
    animation: ${arrowAnimation} 2s infinite;
  }
`;

const ResetButton = styled.div`
  width: 31px;
  height: 31px;
  border-radius: 50%;
  position: absolute;
  top: 1230px;
  left: 50%;
  transform: translate(1400%, 20%);
  cursor: pointer;
  background: #282828;
  > img {
    padding: 7px;
  }
  &:hover {
    background: #30c4ff;
  }
`;

export default function Fast({
  setPickMeta,
}: {
  setPickMeta: (value: string) => void;
}) {
  const [championData, setChampionData] = useState<ChampionDataForm[]>([]); // Fast표에 챔피언을 보여주기 위한 데이터
  const [championPickData, setChampionPickData] = useState<string[]>([]); // Fast표에 챔피언 흑백나눠서 보여주기 위한 데이터
  const [groupPrice, setGroupPrice] = useState<number[]>([]); // Fast표에서 가격별로 구분해주기 위한 그룹
  const [selectName, setSelectName] = useState<string[]>([]); // 내가 선택한 챔피언의 이름을 모아둔 배열

  const { pickData } = useMetaContext(); // PickData를 통해 Meta에 받아온 정보가 저장되어 있음

  // 처음 실행
  useEffect(() => {
    // 챔피언 리스트에 챔피언 불러오기
    const championApi = async () => {
      const [responseAll, responsePick] = await Promise.all([
        Api({
          method: "GET",
          lastUrl: "meta/championsearch/",
        }),
        Api({
          method: "GET",
          lastUrl: "/meta/usechampionsearch/",
        }),
      ]);
      setChampionData(responseAll.data);
      setChampionPickData(responsePick.data);
      const prices = responseAll.data.map(
        (item: ChampionDataForm) => item.price,
      );
      setGroupPrice(Array.from(new Set(prices))); // 중복 제거
    };
    championApi();
  }, []);

  // pickData 상태가 변경될 때마다 실행
  useEffect(() => {
    // console.log(pickData);
  }, [pickData]);

  const handleClick = (name: string) => {
    setSelectName(prevNames => {
      const updatedNames = [...prevNames];
      const index = updatedNames.indexOf(name); // 배열안에 name이 있는지 확인 (0이하면 없음 양수면 있음)
      if (index < 0) {
        updatedNames.push(name); // 이전 값에 새 name 추가
      } else {
        updatedNames.splice(index, 1); // 중복이면 배열에서 제거 (index번째로부터 1개)
      }
      if (updatedNames) {
        pickData.includes(name);
      }
      const names = updatedNames.join(","); // 배열을 ','로 합친 문자열로 변경하고 생성
      sendPickMeta(names); // API 호출
      return updatedNames; // 상태 업데이트
    });
  };

  // 메타 불러오기
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

  // 반환값이 false면 흑백
  const handleMono = (name: string) => {
    // 처음 들어오는 챔피언 자체가 덱에 있는지 여부 없으면 흑백
    if (!championPickData.includes(name)) {
      return false;
    }
    // 선택된게 아무것도 없을때 컬러, 다시 다 취소해도 컬러 유지
    if (selectName.length === 0) {
      return true;
    }
    // 내가 선택한거에 따라 선택했으면 컬러
    if (pickData.includes(name)) {
      return true;
    }
    // 나머지 경우 다 흑백
    return false;
  };

  // 스크롤
  const handleDown = () => {
    window.scrollTo({
      top: 1100,
      behavior: "smooth",
    });
  };

  // 리셋
  const handleReset = () => {
    setSelectName([]);
    setPickMeta("");
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
              <LineColor $bgcolor={ChampionColor(price)}> </LineColor>
              <ChampionList>
                {championData
                  .filter(
                    (item: ChampionDataForm) =>
                      item.price === price &&
                      item.name !== "휘감는뿌리" &&
                      item.name !== "거대메크로봇",
                  )
                  .sort((a, b) => a.name.localeCompare(b.name, "ko-KR")) // 가나다 순 정렬
                  .map((item: ChampionDataForm) => (
                    <Champion
                      key={item?.name}
                      onClick={
                        handleMono(item.name)
                          ? () => handleClick(item?.name)
                          : undefined
                      }
                    >
                      <ChampionImg
                        src={item?.img.img_src}
                        alt="챔피언"
                        color={ChampionColor(item.price)}
                        filter={handleMono(item.name) ? "none" : "grayscale(1)"}
                      />
                      {selectName.includes(item.name) && (
                        <CheckImg src={checkImg} alt="체크 표시" />
                      )}
                      <p>{item?.name}</p>
                      <Tooltip className="tooltip">{item?.name}</Tooltip>
                    </Champion>
                  ))}
              </ChampionList>
            </li>
          ))}
        <ScrollButton onClick={() => handleDown()}>
          <img src={downImg} alt="아래 화살표" />
          <p>Scroll</p>
        </ScrollButton>
        <ResetButton onClick={() => handleReset()}>
          <img src={resetImg} alt="리셋 버튼" />
        </ResetButton>
      </FastBox>
    </Body>
  );
}
