import { ModelStatic } from 'sequelize';
import Teams from '../database/models/team';
import ITeam from '../interfaces/Team';

class TeamService {
  private teamModel: ModelStatic<Teams>;

  constructor(model: ModelStatic<Teams>) {
    this.teamModel = model;
  }

  public async supplyAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async supplyById(id: string): Promise<ITeam | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}

export default TeamService;
