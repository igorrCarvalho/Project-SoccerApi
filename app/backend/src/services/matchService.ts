import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Match';
import Teams from '../database/models/team';

class MatchService {
  private matchModel: ModelStatic<Matches>;

  constructor(model: ModelStatic<Matches>) {
    this.matchModel = model;
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
}

export default MatchService;
