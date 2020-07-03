import { Router } from 'express';
import ensureAuthenticated from '@modules/sigitm/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import TPsController from '../controllers/TPsController';

const tpsRouter = Router();
const tpsController = new TPsController();

tpsRouter.use(ensureAuthenticated);

tpsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      daysBefore: Joi.number().required(),
      daysAfter: Joi.number().required(),
      tipoRede1: Joi.number().required(),
      tipoRede2: Joi.number().required(),
    },
  }),
  tpsController.index,
);

tpsRouter.post(
  '/ids',
  celebrate({
    [Segments.BODY]: {
      ids: Joi.array().items(Joi.number()).required(),
    },
  }),
  tpsController.list,
);

tpsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  tpsController.show,
);

export default tpsRouter;
