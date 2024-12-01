import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Api } from "../utils/apis/Api";
import { ListForm } from "../types/List";
import Header from "../components/containers/Header";
import Meta from "../components/common/Meta";
import Footer from "../components/containers/Footer";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 4.4375rem; // 71px
  background-color: #f4f4f4;
`;

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
    <Body>
      <header>
        <Header
          searchValue={typeof searchData === "string" ? searchData : ""}
        />
      </header>
      <main>
        <Contents>
          {metaData && metaData.length > 0 ? (
            <Meta metaData={metaData} />
          ) : (
            <div>데이터가 없습니다</div> // 데이터가 없을 때
          )}
        </Contents>
      </main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
