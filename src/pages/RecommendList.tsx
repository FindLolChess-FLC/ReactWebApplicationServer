import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "../components/containers/Header";
import Meta from "../components/common/Meta";
import Footer from "../components/containers/Footer";
import recommendImg from "../assets/img/recommend.png";
import { Api } from "../utils/apis/Api";
import { ListForm } from "../types/List";

const Body = styled.div`
  display: flex;
  flex-direction: column;
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
  padding: 4.4375rem; // 71px
  background-color: #f4f4f4;
`;

const SubTitle = styled.div`
  width: 62.75rem; // 1004px
  font-size: 2.25rem; // 36px
  padding: 0 0 1.4375rem 0.6875rem; // 0 0 23px 11px
  border-bottom: 1px solid #8d8d8d;
`;

export default function RecommendList() {
  const [metaData, setMetaData] = useState<ListForm[] | null>(null);

  useEffect(() => {
    const searchApi = async () => {
      const response = await Api({
        method: "GET",
        lastUrl: "meta/metasearch/",
      });
      setMetaData(response.data);
    };
    searchApi();
  }, []);

  return (
    <Body>
      <header>
        <Header />
      </header>
      <main>
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
            <Meta metaData={metaData} />
          ) : (
            <div>로딩</div> // 로딩
          )}
        </Contents>
      </main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
