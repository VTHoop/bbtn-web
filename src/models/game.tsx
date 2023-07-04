export interface Game {
  _id: string;
  home_team: any;
  away_team: any;
  field: boolean[];
  inning: number;
  outs: number;
  batting_team: number;
  home_score: number;
  away_score: number;
  is_over: boolean;
  last_play_result: string;
}
