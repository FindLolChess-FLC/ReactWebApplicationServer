import bletImg from "../../assets/img/거인의 허리띠.png";
import bowImg from "../../assets/img/곡궁.png";
import spatulaImg from "../../assets/img/뒤집개.png";
import vestImg from "../../assets/img/쇠사슬 조끼.png";
import rodImg from "../../assets/img/쓸데없이 큰 지팡이.png";
import tearImg from "../../assets/img/여신의 눈물.png";
import glovesImg from "../../assets/img/연습용 장갑.png";
import cloakImg from "../../assets/img/음전자 망토.png";
import fryingPanImg from "../../assets/img/프라이팬.png";
import swordImg from "../../assets/img/B.F.대검.png";

export default function ItemImage(name: string) {
  const item: Record<string, string> = {
    "거인의 허리띠": bletImg,
    곡궁: bowImg,
    뒤집개: spatulaImg,
    "쇠사슬 조끼": vestImg,
    "쓸데없이 큰 지팡이": rodImg,
    "여신의 눈물": tearImg,
    "연습용 장갑": glovesImg,
    "음전자 망토": cloakImg,
    프라이팬: fryingPanImg,
    "B.F.대검": swordImg,
  };
  return item[name];
}
