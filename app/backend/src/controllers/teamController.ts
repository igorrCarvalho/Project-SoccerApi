import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  constructor(private teamService: TeamService) {}

  public showAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teams = await this.teamService.supplyAll();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  public showById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.teamService.supplyById(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
