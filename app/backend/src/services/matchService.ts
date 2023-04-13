import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Match';
import Teams from '../database/models/team';

class MatchService {
  private matchModel: ModelStatic<Matches>;

  constructor(model: ModelStatic<Matches>) {
    this.matchModel = model;
  }

  public async findById(id: number): Promise<boolean> {
    const match = await this.matchModel.findByPk(id);
    return !!match;
  }

  public async supplyAllMatches(filterByProgress: string | null): Promise<Matches[]> {
    const matches = await this.matchModel.findAll(
      { include: [{ model: Teams, as: 'homeTeam' }, { model: Teams, as: 'awayTeam' }] },
    );

    if (filterByProgress === 'true') {
      return matches.filter((obj) => obj.inProgress === true);
    }

    if (filterByProgress === 'false') {
      return matches.filter((obj) => obj.inProgress === false);
    }

    return matches;
  }

  public async tryToFinish(id: number): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }

  public async supplyUpdate(id: number, homeTeamGols: number, awayTeamGols: number): Promise<void> {
    await this.matchModel.update({ homeTeamGols, awayTeamGols }, { where: { id } });
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.matchModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  }
}

export default MatchService;
