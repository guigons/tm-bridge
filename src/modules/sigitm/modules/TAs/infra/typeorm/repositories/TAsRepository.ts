import {
  getRepository,
  Repository,
  WhereExpression,
  Brackets,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { classToClass } from 'class-transformer';
import ITAsRepository from '../../../repositories/ITAsRepository';
import ILoadTAsGroupDTO from '../../../dtos/ILoadTAsGroupDTO';
import TA from '../entities/TA';

class TAsRepository implements ITAsRepository {
  private ormRepository: Repository<TA>;

  constructor() {
    this.ormRepository = getRepository(TA, 'sigitm');
  }

  public async findByStatusAndTipoRede(
    { status1, status2, tipoRede1, tipoRede2 }: ILoadTAsGroupDTO,
    options: FindManyOptions<TA> | undefined,
  ): Promise<TA[]> {
    const tas = await this.ormRepository.find({
      select: options?.select,
      relations: options?.relations,
      where: (qb: WhereExpression) => {
        qb.where(
          new Brackets((qbRede: WhereExpression) => {
            qbRede
              .where('TA.idStatus = :status1', { status1 })
              .orWhere('TA.idStatus = :status2', { status2 });
          }),
        ).andWhere(
          new Brackets((qbRede: WhereExpression) => {
            qbRede
              .where('TA.idTipoRede = :tipoRede1', { tipoRede1 })
              .orWhere('TA.idTipoRede = :tipoRede2', { tipoRede2 });
          }),
        );
      },
    });
    return tas.map(ta => classToClass(ta));
  }

  public async findByIds(
    ids: number[],
    options: FindManyOptions<TA> | undefined,
  ): Promise<TA[]> {
    const tas = await this.ormRepository.findByIds(ids, options);

    return tas.map(ta => classToClass(ta));
  }

  public async findById(
    id: number,
    options?: FindOneOptions<TA> | undefined,
  ): Promise<TA | undefined> {
    const ta = await this.ormRepository.findOne(id, options);

    return classToClass(ta);
  }
}

export default TAsRepository;
