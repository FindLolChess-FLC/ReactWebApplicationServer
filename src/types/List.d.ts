// 각각 시너지(synergy의 타입)
export type SynergyForm = {
  [key: string]: string;
};

// 각각 챔피언(champion의 타입)
export type ChampionForm = {
  img: {
    img_src: string;
  };
  name: string;
  price: number;
  synergy: SynergyForm;
};

// 증강체(augmenter의 타입)
export type AugmenterForm = {
  effect: string;
  img: {
    img_src: string;
  };
  name: string;
  tier: string;
};

// 모든 챔피언들(champions의 타입)
export type ChampionsForm = {
  champion: ChampionForm;
  location: number;
  star: number;
};

// 메타(meta의 타입)
export type MetaForm = {
  id: number;
  title: string;
  like_count: number;
  dislike_count: number;
  augmenter: Array<AugmenterForm>;
  champions: Array<ChampionsForm>;
};

// 모든 시너지들(synergys의 타입)
export type SynergysForm = {
  [key: string]: number | string;
};

// 전체(item의 타입)
export type ListForm = {
  meta: MetaForm;
  synergys: SynergysForm;
};
