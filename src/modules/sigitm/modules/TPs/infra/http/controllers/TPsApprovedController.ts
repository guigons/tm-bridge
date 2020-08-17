import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListTPsApprovedByFilaService from '../../../services/ListTPsApprovedByFilaService';

export default class TPsApprovedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { daysBefore, daysAfter, fila } = request.query;
    const listTPsApprovedByFila = container.resolve(
      ListTPsApprovedByFilaService,
    );

    const tps = await listTPsApprovedByFila.execute({
      daysBefore: Number(daysBefore),
      daysAfter: Number(daysAfter),
      fila: Number(fila),
    });

    return response.json(tps);
  }
}
