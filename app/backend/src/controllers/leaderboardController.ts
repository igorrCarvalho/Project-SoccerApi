import { Request, Response } from 'express';
import ILeaderboard from '../interfaces/Leaderboard';

class LeaderboardController {
  private leaderboardService: ILeaderboard;

  constructor(service: ILeaderboard) {
    this.leaderboardService = service;
  }

  async showLeaderboard(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.supplyLeaderboard();
    res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
