import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private matchService: MatchService;

  constructor(service: MatchService) {
    this.matchService = service;
  }

  public showAllMatches = async (req: Request, res: Response) => {
    const matches = await this.matchService.supplyAllMatches();
    return res.status(200).json(matches);
  };
}

export default MatchController;
