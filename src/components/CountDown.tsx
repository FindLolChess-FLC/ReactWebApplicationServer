import { useEffect, useRef } from "react";
import styled from "styled-components";
import useTimeFormat from "../hooks/useTimeFormat";
import { CountDownProps } from "../types/Countdown";

export default function CountDown({ duration }: CountDownProps) {
  const CountDiv = styled.div`
    color: #5144ed;
    font-weight: 400;
    font-size: 0.9375rem; // 15px
  `;
  const countRef = useRef(duration);
  const displayRef = useRef<HTMLDivElement>(null); // 화면상 숫자는 바뀌어야하니 dom 요소에 접근하기 위한 ref

  useEffect(() => {
    const interval = setInterval(() => {
      if (countRef.current > 0) {
        countRef.current -= 1;
        if (displayRef.current) {
          displayRef.current.innerText = useTimeFormat(countRef.current); // useTimeFormat 자체가 string 형식
        }
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, duration * 1000);
  }, []);

  return (
    // 처음 1번을 위해 여기에도 useTimeFormat을 해줘야함
    <CountDiv ref={displayRef}>{useTimeFormat(countRef.current)}</CountDiv>
  );
}
