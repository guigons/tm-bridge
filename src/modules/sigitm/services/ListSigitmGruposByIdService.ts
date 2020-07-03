import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import SigitmGrupo from '../infra/typeorm/entities/SigitmGrupo';
import ISigitmGruposRepository from '../repositories/ISigitmGruposRepository';

interface IRequest {
  ids: number[];
}

@injectable()
export default class ShowSigitmGruposByIdService {
  constructor(
    @inject('SigitmGruposRepository')
    private sigitmGruposRepository: ISigitmGruposRepository,
  ) {}

  public async execute({ ids }: IRequest): Promise<SigitmGrupo[]> {
    const sigitmGrupos = await this.sigitmGruposRepository.findByIds(ids);

    return sigitmGrupos;
  }
}
