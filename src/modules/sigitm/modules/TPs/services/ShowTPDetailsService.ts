import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import ITPsRepository from '../repositories/ITPsRepository';
import TP from '../infra/typeorm/entities/TP';

interface IRequest {
  id: number;
}

@injectable()
export default class ShowTPDetailsService {
  constructor(
    @inject('TPsRepository')
    private TPsRepository: ITPsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<TP | undefined> {
    const tp = await this.TPsRepository.findById(id, {
      relations: [
        'status',
        'impacto',
        'atividade',
        'rede',
        'rede.tipo',
        'tipoPlanta',
        'tipoTrabalho',
        'empresa',
        'tipoAfetacao',
        'motivo',
        'criador',
        'criadorGrupo',
        'responsavel',
        'fila',
        'encerrador',
        'encerradorGrupo',
        'dadosIP',
        'equipamento',
        'baixa',
        'ciente',
        'ciente.usuario',
        'ciente.grupo',
        'historicos',
        'historicos.usuario',
        'historicos.grupo',
      ],
    });

    if (!tp) return undefined;

    return tp;
  }
}
