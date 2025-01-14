// 각각 시너지(champions안에 있는 synergy의 타입)
export type SynergyForm = {
  [key: string]: string;
};

// 전체 ChampionData(item의 타입)
export type ChampionDataForm = {
  img: {
    img_src: string;
  };
  name: string;
  price: number;
  synergy: SynergyForm;
};
