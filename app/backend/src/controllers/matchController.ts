import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private matchService: MatchService;

  constructor(service: MatchService) {
    this.matchService = service;
  }

  public showAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this.matchService.supplyAllMatches(inProgress as string | null);
    return res.status(200).json(matches);
  };

  public finishCurrentMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchService.tryToFinish(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGols, awayTeamGols } = req.body;
    await this.matchService.supplyUpdate(Number(id), homeTeamGols, awayTeamGols);
    res.status(200).json();
  };
}

export default MatchController;
