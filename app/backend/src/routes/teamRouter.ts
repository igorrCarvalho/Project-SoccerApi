import { Router } from 'express';
import Teams from '../database/models/team';
import TeamService from '../services/teamService';
import TeamController from '../controllers/teamController';

const teamsRouter = Router();
const service = new TeamService(Teams);
const controller = new TeamController(service);

teamsRouter.get('/', controller.showAll);

export default teamsRouter;
