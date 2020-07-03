import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import TP from '../infra/typeorm/entities/TP';
import ITPsRepository from '../repositories/ITPsRepository';

interface IRequest {
  ids: number[];
}

@injectable()
export default class ListTPsSummaryService {
  constructor(
    @inject('TPsRepository')
    private TPsRepository: ITPsRepository,
  ) {}

  public async execute({ ids }: IRequest): Promise<TP[]> {
    const tps = await this.TPsRepository.findByIds(ids, {
      relations: [
        'responsavel',
        'fila',
        'criador',
        'criadorGrupo',
        'ciente',
        'ciente.usuario',
        'ciente.grupo',
        'historicos',
        'historicos.usuario',
        'historicos.grupo',
      ],
    });
    return tps;
  }
}
