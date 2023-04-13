import { ModelStatic } from 'sequelize';
import Teams from '../database/models/team';
import Matches from '../database/models/Match';
import getResults, { classified } from '../middlewares/createLeaderboard';

class LeaderboardService {
  private teamModel: ModelStatic<Teams> = Teams;
  private matchModel: ModelStatic<Matches> = Matches;

  constructor(matchModel: ModelStatic<Matches>, teamModel: ModelStatic<Teams>) {
    this.teamModel = teamModel;
    this.matchModel = matchModel;
  }

  async supplyLeaderboard() {
    const teams = await this.teamModel.findAll();
    const home = await Promise.all(teams.map(async (obj) => {
      const matches = await this.matchModel.findAll(
        { where: { homeTeamId: obj.id, inProgress: false } },
      );
      const teamsQuery = await Promise.all(matches
        .map((match) => getResults(obj.teamName, [match])));
      const last = teamsQuery[matches.length - 1];
      return { ...last };
    }));

    return classified(home);
  }
}

export default LeaderboardService;
