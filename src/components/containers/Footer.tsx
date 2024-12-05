import styled from "styled-components";
import arrowUPImg from "../../assets/icon/arrow_button_up.svg";

const Body = styled.div`
  position: relative;
  background: #242424;
  color: #fff;
  height: 6.875rem; // 110px
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
    </Body>
  );
}
