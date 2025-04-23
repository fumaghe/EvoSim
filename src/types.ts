export interface Evolution {
  id: string;
  name: string;
  unlockDate: string;
  expiryDate: string;
  cost: number | 'FREE';
  requirements: string[];
  effects: {
    pace?: number;
    shooting?: number;
    passing?: number;
    dribbling?: number;
    defending?: number;
    physical?: number;
  };
  finalBonus?: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  overall: number;
  stats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  playStyles: {
    normal: string[];
    plus: string[];
  };
  availableEvolutions: string[];
}

export type FilterOptions = {
  search: string;
  position: string;
  unlockDateFrom: string;
  expiresBefore: string;
  selectedEvolutions: string[];
  chainEvolutions: boolean;
  stats: {
    pace?: number;
    shooting?: number;
    passing?: number;
    dribbling?: number;
    defending?: number;
    physical?: number;
  };
  evoRequirements: {
    maxOverall?: number;
    positions?: string[];
  };
};