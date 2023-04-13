import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
import LeaderboardService from '../services/leaderboardService';
import Matches from '../database/models/Match';
import Teams from '../database/models/team';

const leaderboardRouter = Router();

const service = new LeaderboardService(Matches, Teams);
const controller = new LeaderboardController(service);

leaderboardRouter
  .get('/home', (req: Request, res: Response) => controller.showLeaderboard(req, res));

export default leaderboardRouter;
