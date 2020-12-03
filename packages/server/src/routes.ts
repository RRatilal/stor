import { Router } from 'express';

import UsersController from './controllers/UsersController';
import ClassroomsController from './controllers/ClassroomsController';

const routes = Router();

routes.post('/users', UsersController.create);

routes.get('/classroom/:user_id', ClassroomsController.show)
routes.post('/classroom/:user_id', ClassroomsController.create)

export default routes;