import { Router } from 'express';
import verifyLoginMiddleware from '../middlewares/verifyLogin';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';
import User from '../database/models/User';
import validateToken from '../middlewares/verifyToken';

const loginRouter = Router();

const service = new LoginService(User);
const controller = new LoginController(service);

loginRouter.get('/');

loginRouter.post('/', verifyLoginMiddleware, controller.tryLogin);

loginRouter.get('/role', validateToken, controller.showRole);

export default loginRouter;
