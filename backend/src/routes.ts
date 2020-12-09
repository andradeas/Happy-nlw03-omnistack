import { Router } from 'express';
import multer from 'multer';


import uploadConfig from './config/upload';
import OrphanagesController  from './controllers/OrphanagesControllers';

import UsersController from './controllers/UsersControllers';

const routes = Router();
const upload = multer(uploadConfig);

//index, show, create, update, delete

routes.post('/orphanages', upload.array('images') ,OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/users-create', UsersController.create);
routes.post('/sessions', UsersController.show);

export default routes;