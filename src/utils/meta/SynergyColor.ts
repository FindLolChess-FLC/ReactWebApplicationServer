import bronzeImg from "../../assets/icon/bronze.svg";
import silverImg from "../../assets/icon/silver.svg";
import goldImg from "../../assets/icon/gold.svg";
import chromaticImg from "../../assets/icon/chromatic.svg";
import uniqueImg from "../../assets/icon/unique.svg";

export default function SynergyColor(
  number: number,
  key: string,
  effect: string,
  sequence: string[],
) {
  // 정규표현식으로 effect안의 (숫자) 가져오기
  const match = effect.match(/\((\d+)\)/g);
  const effectNumbers = match
    ? match.map(num => parseInt(num.replace(/\(|\)/g, ""), 10))
    : [];
  // sequence의 결과값을 담을 배열
  const sequenceArray = [];
  // 조건식으로 시너지 갯수에 맞는 시너지 배경 부여
  if (effectNumbers.length === 1) {
    return uniqueImg;
  }
  for (let i = 0; i < effectNumbers.length - 1; i += 1) {
    if (effectNumbers[i] <= number && effectNumbers[i + 1] > number) {
      sequenceArray.push(sequence[i]);
    } else if (effectNumbers[i + 1] <= number) {
      sequenceArray.push(sequence[i + 1]);
    }
  }
  if (sequenceArray.includes("prism")) {
    return chromaticImg;
  }
  if (sequenceArray.includes("gold")) {
    return goldImg;
  }
  if (sequenceArray.includes("silver")) {
    return silverImg;
  }
  if (sequenceArray.includes("bronze")) {
    return bronzeImg;
  }
  return undefined;
}
