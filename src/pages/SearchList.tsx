import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Api } from "../utils/apis/Api";

type MetaForm = {
  meta: {
    id: number;
    title: string;
  };
};
export default function SearchList() {
  const [metaData, setMetaData] = useState<MetaForm[] | null>(null);
  const location = useLocation(); // navigate로 전달된 데이터 받기
  const searchData = location.state; // 전달된 검색어

  useEffect(() => {
    async function searchApi() {
      const response = await Api({
        bodyData: { data: searchData }, // 내 코드에선 search라는 이름이지만 DB에선 data라는 이름으로 받아서 변경해줌
        method: "POST",
        lastUrl: "meta/metasearch/",
      });
      console.log(response.data);
      setMetaData(response.data);
    }
    searchApi();
  }, [searchData]);
  return (
    <div>
      {metaData && metaData.length > 0 ? (
        metaData.map((item: MetaForm) => (
          <div key={item?.meta.id}>
            {item?.meta.title}
            <hr />
          </div>
        ))
      ) : (
        <div>데이터가 없습니다</div> // 데이터가 없을 때
      )}
    </div>
  );
}
