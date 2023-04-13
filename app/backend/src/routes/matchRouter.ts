import { Router } from 'express';
import MatchService from '../services/matchService';
import Matches from '../database/models/Match';
import MatchController from '../controllers/matchController';
import validateToken from '../middlewares/verifyToken';

const matchRouter = Router();

const service = new MatchService(Matches);
const controller = new MatchController(service);

matchRouter.get('/', controller.showAllMatches);

matchRouter.patch('/:id/finish', validateToken, controller.finishCurrentMatch);

matchRouter.patch('/:id', validateToken, controller.updateMatch);

matchRouter.post('/', validateToken, controller.generateMatch);

export default matchRouter;
