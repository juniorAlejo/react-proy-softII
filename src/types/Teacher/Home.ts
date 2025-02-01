export type IconKey = "BookCopy" | "Newspaper" | "CalendarArrowUp" | "ThumbsUp";

  
export interface Stat {
  title: string;
  total: string;
  rate: string;
  levelUp: boolean;
  icon: IconKey;
}

export interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

export interface TableState {
    name: string;
    date: string;
  }


export interface UserData {
  user: {
    name: string;
    profileImage: string;
  };
  stats: Stat[];
  grafico: ChartOneState;
  tabla: TableState[];
}
