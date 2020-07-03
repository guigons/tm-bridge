import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListSigitmGruposService from '@modules/sigitm/services/ListSigitmGruposService';

export default class SigitmGruposController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSigitmGrupos = container.resolve(ListSigitmGruposService);

    const sigitmGrupos = await listSigitmGrupos.execute();

    return response.json(sigitmGrupos);
  }
}
