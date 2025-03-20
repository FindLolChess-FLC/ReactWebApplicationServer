import styled from "styled-components";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Header from "../components/containers/Header";
import Footer from "../components/containers/Footer";
import mypageImg from "../assets/img/mypage.png";
import Meta from "../components/common/Meta";
import { ListForm } from "../types/List";
import { Api } from "../utils/apis/Api";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

const ImageBox = styled.div`
  overflow: hidden;
  width: 100%;
  height: 9.875rem; // 158px
  background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%);
`;

const DivBox = styled.div`
  margin: auto;
  display: flex;
  position: relative;
  width: 90rem; // 1440px
  height: 9.875rem; // 158px
`;

const Text = styled.div`
  position: absolute;
  top: 3.4375rem; // 55px
  left: 500px;
  font-size: 3.0625rem; // 49px
  font-weight: 700;
  color: #fff;
`;

const Image = styled.img`
  position: absolute;
  top: -6.25rem; // -100px
  right: 17.5rem; // 280px
  width: 25rem; // 400px
  height: 25rem; // 400px
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 50px 20px 100px 20px;
`;

export default function Favorites() {
  const [metaData, setMetaData] = useState<ListForm[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchApi = async () => {
      setIsLoading(true);
      const response = await Api({
        method: "GET",
        lastUrl: "user/checkfavorite/",
      });
      console.log(response.data);
      setMetaData(response.data);
      setIsLoading(false);
    };
    searchApi();
  }, []);

  const renderContent = () => {
    // 로딩 상태
    if (isLoading) {
      return (
        <Skeleton
          height="550px"
          width="1004px"
          baseColor="#DCDCDC"
          borderRadius="27px"
        />
      );
    }
    // 데이터가 있을 때
    if (metaData && metaData.length > 0) {
      return <Meta metaData={metaData} />;
    }
    // 데이터가 없을 때
    return <h2>아직 즐겨찾기한 항목이 없습니다.</h2>;
  };
  return (
    <Body>
      <header>
        <Header />
      </header>
      <Main>
        <ImageBox>
          <DivBox>
            <Text>
              <h1>나의 즐겨찾기</h1>
            </Text>
            <Image src={mypageImg} alt="즐겨찾기 이미지" />
          </DivBox>
        </ImageBox>
        <Contents>{renderContent()}</Contents>
      </Main>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
