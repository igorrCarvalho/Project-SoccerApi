export interface IResult {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalLosses: number,
  totalDraws: number,
  goalsOwn: number,
  goalsFavor: number,
  efficiency: string,
  goalsBalance: number,
}

export default interface ILeaderboard {
  supplyLeaderboard(): Promise<IResult[]>;
}
