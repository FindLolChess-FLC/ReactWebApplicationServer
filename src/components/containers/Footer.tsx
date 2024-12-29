import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import arrowUPImg from "../../assets/icon/arrow_button_up.svg";
import linkImg from "../../assets/icon/arrow_link.svg";
import instagramEmptyImg from "../../assets/icon/instagram_empty.svg";
import instagramFillImg from "../../assets/icon/instagram_fill.svg";

const Body = styled.div`
  position: relative;
  background: #242424;
  color: #fff;
  height: 332px;
`;
const ArrowUp = styled.img`
  width: 3.4375rem; // 55px
  height: 3.4375rem; // 55px
  position: fixed;
  bottom: 2.1875rem; // 35px
  right: 2.1875rem; // 35px
  cursor: pointer;
  z-index: 10;
`;
const Main = styled.div`
  width: 1202px;
  margin: auto;
`;
const Contents = styled.div`
  display: flex;
  gap: 45px;
  padding: 59px 0 45px;
  margin-bottom: 30px;
  border-bottom: 1px solid #7c7c7c;
  > h1 {
    font-family: "Roboto", black;
    font-size: 46px;
  }
`;
const Social = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  font-size: 14px;
  font-family: "Roboto", regular;
  font-weight: 500;
`;
const Instagram = styled.div`
  display: flex;
  align-items: center;
  font-family: "Roboto", semibold;
  font-weight: 400;
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  padding: 0 4px 0 7px;
  text-decoration: none; // 기본 텍스트 장식 제거
  color: inherit; // 부모 요소의 색상 상속

  &:hover {
    text-decoration: underline; // 호버 시 밑줄 추가
  }
`;

const Copyright = styled.span`
  color: #7c7c7c;
  font-size: 14px;
  line-height: 25px;
`;
export default function Footer() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Body>
      <ArrowUp src={arrowUPImg} alt="위쪽" onClick={() => handleTop()} />
      <Main>
        <Contents>
          <h1>Find Lol Chess</h1>
          <Social>
            <p>SOCIAL :</p>
            <Instagram
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={isHover ? instagramEmptyImg : instagramFillImg}
                alt="인스타그램 이미지"
              />
              <StyledLink
                to="https://www.instagram.com/flc.findlolchess/?igsh=N250cGFhYnFoY2dt"
                target="blank"
              >
                FLC Instagram
              </StyledLink>
              <img src={linkImg} alt="링크 이미지" />
            </Instagram>
          </Social>
        </Contents>
        <Copyright>
          <p>© FindLolChess. All Rights Reserved.</p>
          <p>
            FindLolChess isn&apos;t endorsed by Riot Games and doesn&apos;t
            reflect the views or opinions of Riot Games or anyone
          </p>
          <p>
            officially involved in producing or managing League of Legends.
            League of Legends and Riot Games are
          </p>
          <p>
            trademarks or registered trademarks of Riot Games, Inc. League of
            Legends © Riot Games, Inc.
          </p>
        </Copyright>
      </Main>
    </Body>
  );
}
