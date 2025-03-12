import star1Img from "../../assets/icon/star1.svg";
import star2Img from "../../assets/icon/star2.svg";
import star3Img from "../../assets/icon/star3.svg";

export default function ChampionStar(star: number, name: string) {
  if (name === "사이온") return null;
  if (star === 1) return <img src={star1Img} alt="별1" />;
  if (star === 2) return <img src={star2Img} alt="별2" />;
  if (star === 3) return <img src={star3Img} alt="별3" />;
  return null;
}
