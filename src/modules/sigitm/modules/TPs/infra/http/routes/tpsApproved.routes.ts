import { Router } from 'express';
import ensureAuthenticated from '@modules/sigitm/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import TPsApprovedController from '../controllers/TPsApprovedController';

const tpsApprovedRouter = Router();
const tpsApprovedController = new TPsApprovedController();

tpsApprovedRouter.use(ensureAuthenticated);

tpsApprovedRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      daysBefore: Joi.number().required(),
      daysAfter: Joi.number().required(),
      fila: Joi.number().required(),
    },
  }),
  tpsApprovedController.index,
);

export default tpsApprovedRouter;
