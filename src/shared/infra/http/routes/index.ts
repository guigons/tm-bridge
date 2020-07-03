import { Router } from 'express';
import sigitmRouter from '@modules/sigitm/infra/http/routes/sigitm.routes';
import tasRouter from '@modules/sigitm/modules/TAs/infra/http/routes/tas.routes';
import tpsRouter from '@modules/sigitm/modules/TPs/infra/http/routes/tps.routes';

const routes = Router();
routes.use('/sigitm', sigitmRouter);
routes.use('/tas', tasRouter);
routes.use('/tps', tpsRouter);

export default routes;
