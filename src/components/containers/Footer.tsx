import { Link } from "react-router-dom";
import styled from "styled-components";
import arrowUPImg from "../../assets/icon/arrow_button_up.svg";
import instagramEmptyImg from "../../assets/icon/instagram_empty.svg";
import instagramFillImg from "../../assets/icon/instagram_fill.svg";
import emailEmptyImg from "../../assets/icon/email_empty.svg";
import emailFillImg from "../../assets/icon/email_fill.svg";

const Body = styled.div`
  position: relative;
  background: #242424;
  color: #fff;
  height: 203px;
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
  flex-direction: column;
  gap: 14px;
  padding: 31px 0 10px;
  border-bottom: 1px solid #7c7c7c;
  > h1 {
    font-family: "Roboto", black;
    font-size: 24px;
    font-weight: 700;
  }
`;
const Copyright = styled.span`
  color: #7c7c7c;
  font-size: 10px;
  line-height: 18px;
`;

const Event = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;
const Policy = styled.div`
  display: flex;
  gap: 26px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 12px;
`;
const Email = styled.a`
  width: 32px;
  height: 32px;
  cursor: pointer;
  background: url(${emailEmptyImg});
  &:hover {
    background: url(${emailFillImg});
  }
`;
const Instagram = styled(Link)`
  width: 32px;
  height: 32px;
  cursor: pointer;
  background: url(${instagramEmptyImg});
  &:hover {
    background: url(${instagramFillImg});
  }
`;

export default function Footer() {
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
          <Copyright>
            <p>© FindLolChess. All Rights Reserved.</p>
            <p>
              FindLolChess isn&apos;t endorsed by Riot Games and doesn&apos;t
              reflect the views or opinions of Riot Games or anyone officially
              involved in producing or managing League of Legends. League of
            </p>
            <p>
              Legends and Riot Games are trademarks or registered trademarks of
              Riot Games, Inc. League of Legends © Riot Games, Inc.
            </p>
          </Copyright>
        </Contents>
        <Event>
          <Policy>
            <StyledLink
              to="/https://flc.servehttp.com/policy/service/"
              target="blank"
            >
              이용약관
            </StyledLink>
            <StyledLink
              to="/https://flc.servehttp.com/policy/privacy/"
              target="blank"
            >
              개인정보처리방침
            </StyledLink>
          </Policy>
          <Social>
            <Email href="mailto:flc.findlolchess@gmail.com" />
            <Instagram
              to="https://www.instagram.com/flc.findlolchess/?igsh=N250cGFhYnFoY2dt"
              target="blank"
            />
          </Social>
        </Event>
      </Main>
    </Body>
  );
}
