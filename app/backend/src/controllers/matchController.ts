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
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.supplyUpdate(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'ok' });
  };

  public generateMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if (
      !(await this.matchService.findById(Number(homeTeamId)))
      || !(await this.matchService.findById(awayTeamId))
    ) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const newMatch = await this.matchService
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    res.status(201).json(newMatch);
  };
}

export default MatchController;
