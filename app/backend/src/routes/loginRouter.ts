import { Router } from 'express';
import verifyLoginMiddleware from '../middlewares/verifyLogin';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';
import User from '../database/models/User';

const loginRouter = Router();

const service = new LoginService(User);
const controller = new LoginController(service);

loginRouter.get('/');

loginRouter.post('/login', verifyLoginMiddleware, controller.tryLogin);

export default loginRouter;
