import styled from "styled-components";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLocation } from "react-router-dom";
import { Api } from "../utils/apis/Api";
import { ListForm } from "../types/List";
import Header from "../components/containers/Header";
import Meta from "../components/common/Meta";
import Footer from "../components/containers/Footer";
import emptyImg from "../assets/img/empty.png";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 11%;
  background-color: #f4f4f4;
`;
const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > h2 {
    font-size: 1.75rem; // 28px
  }
  > p {
    font-size: 1.1875rem; // 19px
    font-weight: 500;
    color: #888888;
    margin-top: 0.6875rem; // 11px
    margin-bottom: 1.875rem; // 30px
  }
  > img {
    width: 18.75rem; // 300px
  }
`;

export default function SearchList() {
  const [metaData, setMetaData] = useState<ListForm[] | null>(null);
  const location = useLocation(); // navigate로 전달된 데이터 받기
  const [isLoading, setIsLoading] = useState(true);
  const searchData = location.state; // 전달된 검색어

  useEffect(() => {
    const searchApi = async () => {
      setIsLoading(true);
      const response = await Api({
        bodyData: { data: searchData }, // 내 코드에선 search라는 이름이지만 DB에선 data라는 이름으로 받아서 변경해줌
        method: "POST",
        lastUrl: "meta/metasearch/",
      });
      console.log(response.data);
      // response.data : 이중 배열, item의 집합
      setMetaData(response.data);
      setIsLoading(false);
    };
    searchApi();
  }, [searchData]);
  console.log("처음");
  console.log(searchData);

  const renderContent = () => {
    // 로딩 상태
    if (isLoading) {
      return (
        <Skeleton
          height="550px"
          width="1004px"
          baseColor="#ebebeb"
          borderRadius="27px"
        />
      );
    }
    // 데이터가 있을 때
    if (metaData && metaData.length > 0) {
      return <Meta metaData={metaData} />;
    }
    // 데이터가 없을 때
    return (
      <EmptyBox>
        <h2>해당된 메타가 없습니다</h2>
        <p>오탈자가 없는지 확인해주세요!</p>
        <img src={emptyImg} alt="메타 없을때 펭구 이미지" />
      </EmptyBox>
    );
  };
  return (
    <Body>
      <header>
        <Header
          searchValue={typeof searchData === "string" ? searchData : ""}
        />
      </header>
      <main>
        <Contents>{renderContent()}</Contents>
      </main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
