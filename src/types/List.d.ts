// 각각 시너지(champions안에 있는 synergy의 타입)
export type SynergyForm = {
  [key: string]: string;
};

// 각각 챔피언(champions안에 있는  champion의 타입)
export type ChampionForm = {
  img: {
    img_src: string;
  };
  name: string;
  price: number;
  synergy: SynergyForm;
};

// 증강체(Meta안에 있는 augmenter의 타입)
export type AugmenterForm = {
  effect: string;
  img: {
    img_src: string;
  };
  name: string;
  tier: string;
};

// 모든 챔피언들(Meta안에 있는 champions의 타입)
export type ChampionsForm = {
  champion: ChampionForm;
  location: number;
  star: number;
};

// 시너지 내부 목록(synergys안에 있음. synergyGroup의 이름은 다 다름)
export type SynergysListForm = {
  name?: string;
  effect: string;
  img_src: string;
  number: number;
  sequence: string[];
};

// 모든 메타(meta의 타입)
export type MetaForm = {
  id: number;
  title: string;
  like_count: number;
  dislike_count: number;
  reroll_lv: number;
  champions: Array<ChampionsForm>;
};

// 모든 시너지들(synergys의 타입)
export type SynergysForm = {
  [key: string]: SynergysListForm;
};

// 전체(item의 타입)
export type ListForm = {
  meta: MetaForm;
  synergys: Array<SynergysForm>;
};
