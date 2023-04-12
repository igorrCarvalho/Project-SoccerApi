import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import ILogin from '../interfaces/Login';

class LoginController {
  constructor(private loginService: LoginService) {}

  public tryLogin = async (req: Request, res: Response) => {
    const loginData: ILogin = req.body;
    const user = await this.loginService.verifyLogin(loginData);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { token } = user;
    return res.status(200).json({ token });
  };
}

export default LoginController;
