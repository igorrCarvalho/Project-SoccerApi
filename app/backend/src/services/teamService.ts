import { ModelStatic } from 'sequelize';
import Teams from '../database/models/team';
import ITeam from '../interfaces/Team';

class TeamService {
  private teamModel: ModelStatic<Teams>;

  constructor(model: ModelStatic<Teams>) {
    this.teamModel = model;
  }

  public async supplyAll(): Promise<ITeam[]> {
    const result = await this.teamModel.findAll();
    return result;
  }
}

export default TeamService;
