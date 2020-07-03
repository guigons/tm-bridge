import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import SigitmUsuario from '../infra/typeorm/entities/SigitmUsuario';
import ISigitmUsuariosRepository from '../repositories/ISigitmUsuariosRepository';

@injectable()
export default class ShowSigitmUsuariosService {
  constructor(
    @inject('SigitmUsuariosRepository')
    private sigitmUsuariosRepository: ISigitmUsuariosRepository,
  ) {}

  public async execute(): Promise<SigitmUsuario[] | undefined> {
    const sigitmUsuarios = await this.sigitmUsuariosRepository.findAllActive();

    return sigitmUsuarios;
  }
}
