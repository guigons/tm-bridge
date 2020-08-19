import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import ITPsRepository from '../repositories/ITPsRepository';
import TP from '../infra/typeorm/entities/TP';

interface IRequest {
  startDate: string;
  endDate?: string;
  fila: number;
}

@injectable()
export default class ListTPsAprovadasByFilaService {
  constructor(
    @inject('TPsRepository')
    private TPsRepository: ITPsRepository,
  ) {}

  public async execute({ startDate, endDate, fila }: IRequest): Promise<TP[]> {
    const tps = await this.TPsRepository.findApprovedByDateAndFila(
      {
        startDate,
        endDate,
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
          'dadosMetro',
          'dadosEquipamento',
          'children',
          'children.dadosIP',
          'children.dadosMetro',
          'children.dadosEquipamento',
        ],
      },
    );
    return tps;
  }
}
