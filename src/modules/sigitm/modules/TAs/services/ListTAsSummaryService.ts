import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import TA from '../infra/typeorm/entities/TA';
import ITAsRepository from '../repositories/ITAsRepository';

interface IRequest {
  ids: number[];
}

@injectable()
export default class ListTAsSummaryService {
  constructor(
    @inject('TAsRepository')
    private TAsRepository: ITAsRepository,
  ) {}

  public async execute({ ids }: IRequest): Promise<TA[]> {
    const tas = await this.TAsRepository.findByIds(ids, {
      relations: [
        'rede',
        'rede.tipo',
        'responsavel',
        'fila',
        'criador',
        'grupoCriador',
        'dadosIP',
        'dadosMetro',
        'dadosEquipamento',
        // 'parent',
        // 'children',
        // 'children.afetacao_maxima',
        // 'afetacao_maxima',
        'afetacao_parcial',
      ],
    });
    return tas;
  }
}
