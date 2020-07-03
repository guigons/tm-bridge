import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListSigitmGruposByIdService from '@modules/sigitm/services/ListSigitmGruposByIdService';

export default class SigitmGruposController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { ids } = request.body;
    const listSigitmGruposById = container.resolve(ListSigitmGruposByIdService);

    const sigitmGrupos = await listSigitmGruposById.execute({ ids });

    return response.json(sigitmGrupos);
  }
}
