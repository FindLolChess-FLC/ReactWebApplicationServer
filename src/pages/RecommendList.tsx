import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../components/containers/Header";
import Meta from "../components/common/Meta";
import Footer from "../components/containers/Footer";
import recommendImg from "../assets/img/recommend.png";
import { Api } from "../utils/apis/Api";
import { ListForm } from "../types/List";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  background-color: #f4f4f4;
`;

const ImageBox = styled.div`
  overflow: hidden;
  width: 100%;
  height: 15.5rem; // 248px
  background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%);
`;

const DivBox = styled.div`
  margin: auto;
  display: flex;
  position: relative;
  width: 90rem; // 1440px
  height: 15.5rem; // 248px
`;

const Text = styled.div`
  position: absolute;
  top: 4.75rem; // 76px
  left: 10rem; // 160px
  font-size: 1.4375rem; // 23px
  font-weight: 500;
  color: #fff;
  > h1 {
    font-size: 3.4375rem; // 55px
    font-weight: 700;
    padding-bottom: 1.75rem; // 28px
  }
`;

const Image = styled.img`
  position: absolute;
  top: -19.6875rem; // -315px
  right: 6.875rem; // 110px
  width: 40.375rem; // 646px
  height: 54.875rem; // 878px
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8125rem; // 29px
  width: 100%;
  padding: 4.3125rem; // 69px
`;

const SubTitle = styled.div`
  width: 62.75rem; // 1004px
  font-size: 2.25rem; // 36px
  padding: 0 0 1.4375rem 0.6875rem; // 0 0 23px 11px
  border-bottom: 1px solid #8d8d8d;
`;

export default function RecommendList() {
  const [metaData, setMetaData] = useState<ListForm[]>([]);
  // const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // api 가져오는 툴
  const searchApi = async (query: string) => {
    // if (loading) return; // 중복 호출 방지
    // setLoading(true);
    const response = await Api({
      method: "GET",
      lastUrl: `meta/metasearch/${query}`,
    });
    // 메타(이전값을 포함해서 새로운값도 불러옴)
    setMetaData(prev =>
      query === "" ? [...response.data] : [...prev, ...response.data],
    );
    // next_page_url에서 쿼리스트링만 추출
    const nextPageQuery = response.next_page_url?.split("?")[1];
    if (nextPageQuery) {
      setNextUrl(`?${nextPageQuery}`); // 쿼리스트링만 저장
    } else {
      setNextUrl(null);
    }
    // setLoading(false);
  };

  // 추천 api 불러오기
  useEffect(() => {
    searchApi("");
  }, []);

  // 무한 스크롤에 맞춰서 api 불러오기
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 관찰 중인 요소가 화면에 보일때 + 다음 url이 있을 때
        if (entry.isIntersecting && nextUrl) {
          searchApi(nextUrl);
        }
      }, // callback
      { threshold: 0.3 }, // options
    );
    // 타겟 요소 감시 시작
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    // 컴포넌트가 사라질 때 감시 종료
    return () => observer.disconnect();
  }, [nextUrl]);

  return (
    <Body>
      <header>
        <Header />
      </header>
      <Main>
        <ImageBox>
          <DivBox>
            <Text>
              <h1>시즌 13 추천메타</h1>
              <p>FIND LOL CHESS에서 최신 정보를 확인해보세요!</p>
            </Text>
            <Image src={recommendImg} alt="추천 이미지" />
          </DivBox>
        </ImageBox>
        <Contents>
          <SubTitle>추천 메타</SubTitle>
          {metaData && metaData.length > 0 ? (
            <>
              <Meta metaData={metaData} />
              <div ref={observerTarget} /> {/* 감시를 위한 div */}
            </>
          ) : (
            // 로딩
            <Skeleton
              height="550px"
              width="1004px"
              baseColor="#DCDCDC"
              borderRadius="27px"
            />
          )}
        </Contents>
      </Main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
