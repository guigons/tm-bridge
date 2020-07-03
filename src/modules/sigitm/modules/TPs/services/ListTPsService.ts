import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import ITPsRepository from '../repositories/ITPsRepository';
import TP from '../infra/typeorm/entities/TP';

interface IRequest {
  daysBefore: number;
  daysAfter: number;
  tipoRede1: number;
  tipoRede2: number;
}

@injectable()
export default class ListTPsService {
  constructor(
    @inject('TPsRepository')
    private TPsRepository: ITPsRepository,
  ) {}

  public async execute({
    daysBefore,
    daysAfter,
    tipoRede1,
    tipoRede2,
  }: IRequest): Promise<TP[]> {
    const tps = await this.TPsRepository.findByDataInicioPrevAndTipoRede(
      {
        daysBefore,
        daysAfter,
        tipoRede1,
        tipoRede2,
      },
      {
        relations: [
          'status',
          'baixa',
          'ciente',
          'ciente.usuario',
          'ciente.grupo',
          'historicos',
          'historicos.usuario',
          'historicos.grupo',
        ],
      },
    );
    return tps;
  }
}
