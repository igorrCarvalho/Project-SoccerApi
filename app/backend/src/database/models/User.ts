import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare username: string;
  declare role: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'User',
  timestamps: false,
  underscored: true,
});

export default User;
