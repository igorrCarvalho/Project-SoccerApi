import IMatch from '../interfaces/IMatch';
import { IResult } from '../interfaces/Leaderboard';

const results = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};

const restart = () => {
  results.totalGames = 0;
  results.totalPoints = 0;
  results.totalVictories = 0;
  results.totalLosses = 0;
  results.totalDraws = 0;
  results.goalsOwn = 0;
  results.goalsFavor = 0;
};

const victory = (goalsFavor: number, goalsOwn: number) => {
  results.totalVictories += 1;
  results.totalGames += 1;
  results.goalsOwn += goalsOwn;
  results.goalsFavor += goalsFavor;
  results.totalPoints += 3;
};

const loss = (goalsFavor: number, goalsOwn: number) => {
  results.totalLosses += 1;
  results.totalGames += 1;
  results.goalsOwn += goalsOwn;
  results.goalsFavor += goalsFavor;
};

const draw = (goalsFavor: number, goalsOwn: number) => {
  results.totalDraws += 1;
  results.totalGames += 1;
  results.goalsOwn += goalsOwn;
  results.goalsFavor += goalsFavor;
  results.totalPoints += 1;
};

const points = ((matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) {
      victory(homeTeamGoals, awayTeamGoals);
    } else if (homeTeamGoals === awayTeamGoals) {
      draw(homeTeamGoals, awayTeamGoals);
    } else {
      loss(homeTeamGoals, awayTeamGoals);
    }
  });
});

const teamStats = () => {
  const { totalPoints, totalGames, goalsFavor, goalsOwn } = results;
  const balance = goalsFavor - goalsOwn;
  results.goalsBalance = balance;
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  results.efficiency = efficiency;
};

export const classified = (matches: IResult[]) => matches
  .sort((A, B) => {
    if (B.totalPoints !== A.totalPoints) {
      return B.totalPoints - A.totalPoints;
    }
    if (B.totalVictories !== A.totalVictories) {
      return B.totalVictories - A.totalVictories;
    }
    if (B.goalsBalance !== A.goalsBalance) {
      return B.goalsBalance - A.goalsBalance;
    }
    if (B.goalsFavor !== A.goalsFavor) {
      return B.goalsFavor - A.goalsFavor;
    }
    return B.goalsOwn - A.goalsFavor;
  });

const getResults = (name: string, matches: IMatch[]) => {
  if (name !== results.name) restart();
  results.name = name;
  points(matches);
  teamStats();
  return results;
};

export default getResults;
