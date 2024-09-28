import { useEffect, useRef } from "react";

export default function CountDown() {
  const countRef = useRef(180);
  const displayRef = useRef<HTMLDivElement>(null); // 화면상 숫자는 바뀌어야하니 dom 요소에 접근하기 위한 ref

  useEffect(() => {
    const interval = setInterval(() => {
      if (countRef.current > 0) {
        countRef.current -= 1;
        if (displayRef.current) {
          displayRef.current.innerText = countRef.current.toString();
        }
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 180 * 1000);
  }, []);

  return <div ref={displayRef}>{countRef.current}</div>;
}
