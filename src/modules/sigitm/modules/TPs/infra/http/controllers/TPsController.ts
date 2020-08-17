import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListTPsService from '../../../services/ListTPsService';
import ListTPsSummaryService from '../../../services/ListTPsSummaryService';
import ShowTPDetailsService from '../../../services/ShowTPDetailsService';

export default class TPsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { daysBefore, daysAfter, tipoRede1, tipoRede2 } = request.body;
    const listTPs = container.resolve(ListTPsService);

    const tps = await listTPs.execute({
      daysBefore,
      daysAfter,
      tipoRede1,
      tipoRede2,
    });

    return response.json(tps);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) response.json([]);

    const showTPDetails = container.resolve(ShowTPDetailsService);

    const tp = await showTPDetails.execute({ id: Number(id) });

    return response.json(tp);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { ids } = request.body;

    const listTPsSummary = container.resolve(ListTPsSummaryService);

    const tps = await listTPsSummary.execute({ ids });

    return response.json(tps);
  }
}
