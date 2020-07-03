import { Router } from 'express';

import ensureAuthenticated from '@modules/sigitm/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import TAsController from '../controllers/TAsController';

const tasRouter = Router();
const tasController = new TAsController();

tasRouter.use(ensureAuthenticated);

tasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      status1: Joi.number().required(),
      status2: Joi.number().required(),
      tipoRede1: Joi.number().required(),
      tipoRede2: Joi.number().required(),
    },
  }),
  tasController.index,
);

tasRouter.post(
  '/ids',
  celebrate({
    [Segments.BODY]: {
      ids: Joi.array().items(Joi.number()).required(),
    },
  }),
  tasController.list,
);

tasRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  tasController.show,
);

export default tasRouter;
