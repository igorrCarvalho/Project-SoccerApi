'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "teams",
        key: "id",
      },
      field: "away_team_id",
    },
    homeTeamId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "teams",
        key: "id",
      },
      field: "home_team_id",
    },
    awayTeamGoals: {
      type: Sequelize.INTEGER,
      field: "away_team_goals",
    },
    homeTeamGoals: {
      type: Sequelize.INTEGER,
      field: "home_team_goals",
    },
    inProgress: {
      type: Sequelize.BOOLEAN,
      field: "in_progress",
    },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};