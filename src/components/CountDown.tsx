import { useEffect, useRef } from "react";
import styled from "styled-components";
import useTimeFormat from "../hooks/useTimeFormat";
import { CountDownProps } from "../types/Countdown";

export default function CountDown({ timer, setTimer }: CountDownProps) {
  const CountDiv = styled.div`
    color: #5144ed;
    font-weight: 400;
    font-size: 0.9375rem; // 15px
  `;
  const countRef = useRef(timer);
  const displayRef = useRef<HTMLDivElement>(null); // 화면상 숫자는 바뀌어야하니 dom 요소에 접근하기 위한 ref

  useEffect(() => {
    // timer가 변경될때마다 새로 정의
    countRef.current = timer;
    const interval = setInterval(() => {
      if (countRef.current > 0) {
        countRef.current -= 1;

        if (displayRef.current) {
          displayRef.current.innerText = useTimeFormat(countRef.current); // useTimeFormat 자체가 string 형식
          // CountDown이 0이면 넘겨주는 숫자도 0
          if (countRef.current === 0) {
            setTimer(0);
          }
        }
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, timer * 1000);
  }, [timer]);

  return (
    // 처음 1번을 위해 여기에도 useTimeFormat을 해줘야함
    <CountDiv ref={displayRef}>{useTimeFormat(countRef.current)}</CountDiv>
  );
}
