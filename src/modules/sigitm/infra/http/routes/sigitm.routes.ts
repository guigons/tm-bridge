import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import SigitmGruposController from '../controllers/SigitmGruposController';
import SigitmGruposByIdController from '../controllers/SigitmGruposByIdController';
import SigitmUsuariosController from '../controllers/SigitmUsuariosController';

const sigitmRouter = Router();
const sigitmGruposController = new SigitmGruposController();
const sigitmGruposByIdController = new SigitmGruposByIdController();
const sigitmUsuariosController = new SigitmUsuariosController();

sigitmRouter.use(ensureAuthenticated);

sigitmRouter.get('/grupos', sigitmGruposController.index);
sigitmRouter.post(
  '/grupos/ids',
  celebrate({
    [Segments.BODY]: {
      ids: Joi.array().items(Joi.number()).required(),
    },
  }),
  sigitmGruposByIdController.index,
);
sigitmRouter.get('/usuarios', sigitmUsuariosController.index);

export default sigitmRouter;
