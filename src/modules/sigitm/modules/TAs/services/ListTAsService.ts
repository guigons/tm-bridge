import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import ITAsRepository from '../repositories/ITAsRepository';
import TA from '../infra/typeorm/entities/TA';

interface IRequest {
  status1: number;
  status2: number;
  tipoRede1: number;
  tipoRede2: number;
}

@injectable()
export default class ListTAsService {
  constructor(
    @inject('TAsRepository')
    private TAsRepository: ITAsRepository,
  ) {}

  public async execute({
    status1,
    status2,
    tipoRede1,
    tipoRede2,
  }: IRequest): Promise<TA[]> {
    const tas = await this.TAsRepository.findByStatusAndTipoRede({
      status1,
      status2,
      tipoRede1,
      tipoRede2,
    });

    return tas;
  }
}
