import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import ILogin, { IError } from '../interfaces/Login';
import { createToken } from '../auth/authorization';

class LoginService {
  private userModel: ModelStatic<User>;

  constructor(model: ModelStatic<User>) {
    this.userModel = model;
  }

  public async verifyLogin(login: ILogin): Promise< undefined | IError> {
    const { email, password } = login;
    const [user] = await this.userModel.findAll({ where: { email } });
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegex.test(email) || !user) {
      return undefined;
    }

    const verifyPassword = bcrypt.compareSync(password, user.password);

    if (password.length < 6 || !verifyPassword) {
      return undefined;
    }

    const token = createToken(user);
    return { token };
  }
}

export default LoginService;
