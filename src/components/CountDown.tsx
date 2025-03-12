import { useEffect, useRef } from "react";
import styled from "styled-components";
import TimeFormat from "../utils/TimeFormat";
import { CountDownForm } from "../types/Countdown";

const CountDiv = styled.div`
  color: #5144ed;
  font-weight: 400;
  font-size: 0.9375rem; // 15px
`;
export default function CountDown({
  timer,
  setTimer,
  codeSuccess,
}: CountDownForm) {
  const countRef = useRef(timer);
  const displayRef = useRef<HTMLDivElement>(null); // 화면상 숫자는 바뀌어야하니 dom 요소에 접근하기 위한 ref

  // eslint-disable-next-line
  useEffect(() => {
    // 타이머가 0이 아니고, 인증이 성공하지 않은 경우에만 타이머 시작
    if (codeSuccess === false) {
      countRef.current = timer;
      const interval = setInterval(() => {
        if (countRef.current > 0) {
          countRef.current -= 1;
          if (displayRef.current) {
            displayRef.current.innerText = TimeFormat(countRef.current); // useTimeFormat 자체가 string 형식
            // 타이머가 0이면 setTimer를 호출하여 타이머를 0으로 설정
            if (countRef.current === 0) {
              setTimer(0);
            }
          }
        }
      }, 1000);

      // 타이머가 종료되거나 컴포넌트가 언마운트되면 interval을 clear
      return () => clearInterval(interval);
    }
  }, [timer, codeSuccess, setTimer]);

  return (
    // 처음 1번을 위해 여기에도 useTimeFormat을 해줘야함
    <CountDiv ref={displayRef}>{TimeFormat(countRef.current)}</CountDiv>
  );
}
