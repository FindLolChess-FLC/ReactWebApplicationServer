import styled from "styled-components";
import { useState } from "react";
import Header from "../components/containers/Header";
import Carousel from "../components/Carousel";
import Fast from "../components/Fast";
import Footer from "../components/containers/Footer";
import Meta from "../components/common/Meta";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const ContentsBox = styled.div`
  flex: 1;
  background-color: #f2f2f2;
`;

const Contents = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 205px;
  overflow: hidden;
`;

export default function Main() {
  const [pickMeta, setPickMeta] = useState<string>("");

  return (
    <Body>
      <header>
        <Header />
      </header>
      <ContentsBox>
        <Contents>
          <Carousel />
          <Fast setPickMeta={setPickMeta} />
          {pickMeta && pickMeta.length > 0 ? (
            <Meta metaData={pickMeta} />
          ) : (
            <div> </div>
          )}
        </Contents>
      </ContentsBox>
      <footer>
        <Footer />
      </footer>
    </Body>
  );
}
