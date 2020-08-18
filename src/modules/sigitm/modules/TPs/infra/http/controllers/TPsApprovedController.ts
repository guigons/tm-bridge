import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListTPsApprovedByFilaService from '../../../services/ListTPsApprovedByFilaService';

export default class TPsApprovedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate, fila } = request.query;
    const listTPsApprovedByFila = container.resolve(
      ListTPsApprovedByFilaService,
    );

    const tps = await listTPsApprovedByFila.execute({
      startDate: startDate as string,
      endDate: endDate as string,
      fila: Number(fila),
    });

    return response.json(tps);
  }
}
