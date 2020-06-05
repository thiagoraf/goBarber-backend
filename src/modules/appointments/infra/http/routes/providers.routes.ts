import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRouter = Router();
const proovidersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', proovidersController.index);

export default providersRouter;
