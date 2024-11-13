import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Api } from "../utils/apis/Api";
import { ChampionsForm, ListForm } from "../types/List";
import Header from "../components/containers/Header";

export default function SearchList() {
  const [metaData, setMetaData] = useState<ListForm[] | null>(null);
  const location = useLocation(); // navigate로 전달된 데이터 받기
  const searchData = location.state; // 전달된 검색어

  useEffect(() => {
    const searchApi = async () => {
      const response = await Api({
        bodyData: { data: searchData }, // 내 코드에선 search라는 이름이지만 DB에선 data라는 이름으로 받아서 변경해줌
        method: "POST",
        lastUrl: "meta/metasearch/",
      });
      console.log(response.data);
      // response.data : 이중 배열, item의 집합
      setMetaData(response.data);
    };
    searchApi();
  }, [searchData]);
  console.log("처음");
  console.log(searchData);
  return (
    <div>
      <Header searchValue={typeof searchData === "string" ? searchData : ""} />
      <main>
        {metaData && metaData.length > 0 ? (
          // item : meta, synerge
          metaData.map((item: ListForm) => (
            <div key={item?.meta.id}>
              <div>{item?.meta.title}</div>
              {item?.meta.champions &&
                // data :
                item?.meta.champions.map((data: ChampionsForm) => (
                  <div key={data.location}>
                    <div>{data.champion.name}</div>
                    <img src={data.champion.img.img_src} alt="챔피언" />
                  </div>
                ))}
              <hr />
            </div>
          ))
        ) : (
          <div>데이터가 없습니다</div> // 데이터가 없을 때
        )}
      </main>
    </div>
  );
}
