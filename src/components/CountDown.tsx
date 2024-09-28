import { useEffect, useState } from "react";

export default function CountDown() {
  const [count, setCount] = useState(180);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count - 1);
      if (count === 0) {
        setCount(0);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 180 * 1000);
  }, []);

  return <div>{count}</div>;
}
