import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import SigitmGrupo from '../infra/typeorm/entities/SigitmGrupo';
import ISigitmGruposRepository from '../repositories/ISigitmGruposRepository';

@injectable()
export default class ShowSigitmGruposService {
  constructor(
    @inject('SigitmGruposRepository')
    private sigitmGruposRepository: ISigitmGruposRepository,
  ) {}

  public async execute(): Promise<SigitmGrupo[]> {
    const sigitmGrupos = await this.sigitmGruposRepository.findAllActive();

    return sigitmGrupos;
  }
}
