import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListTAsService from '../../../services/ListTAsService';
import ListTAsSummaryService from '../../../services/ListTAsSummaryService';
import ShowTADetailsService from '../../../services/ShowTADetailsService';

export default class TasController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { status1, status2, tipoRede1, tipoRede2 } = request.body;

    const listTAs = container.resolve(ListTAsService);

    const group = await listTAs.execute({
      status1,
      status2,
      tipoRede1,
      tipoRede2,
    });

    return response.json(group);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) response.json([]);

    const listTADetails = container.resolve(ShowTADetailsService);

    const ta = await listTADetails.execute({ id: Number(id) });

    return response.json(ta);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { ids } = request.body;

    const listTAsSummary = container.resolve(ListTAsSummaryService);

    const tas = await listTAsSummary.execute({ ids });

    return response.json(tas);
  }
}
