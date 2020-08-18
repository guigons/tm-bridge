import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import ITPsRepository from '../repositories/ITPsRepository';
import TP from '../infra/typeorm/entities/TP';

interface IRequest {
  daysBefore: number;
  daysAfter: number;
  fila: number;
}

@injectable()
export default class ListTPsAprovadasByFilaService {
  constructor(
    @inject('TPsRepository')
    private TPsRepository: ITPsRepository,
  ) {}

  public async execute({
    daysBefore,
    daysAfter,
    fila,
  }: IRequest): Promise<TP[]> {
    const tps = await this.TPsRepository.findApprovedByDateAndFila(
      {
        daysBefore,
        daysAfter,
        fila,
      },
      {
        select: ['id', 'projeto', 'localidade', 'dataInicioPrevisto'],
        relations: [
          'status',
          'baixa',
          'ciente',
          'ciente.usuario',
          'ciente.grupo',
          'historicos',
          'historicos.usuario',
          'historicos.grupo',
          'dadosIP',
        ],
      },
    );
    return tps;
  }
}
