import {
  getRepository,
  Repository,
  FindOneOptions,
  FindManyOptions,
  WhereExpression,
  Brackets,
} from 'typeorm';
import { classToClass } from 'class-transformer';
import ITPsRepository from '../../../repositories/ITPsRepository';
import ILoadTPsListDTO from '../../../dtos/ILoadTPsListDTO';
import ILoadTPsListApprovedByDateAndFilaDTO from '../../../dtos/ILoadTPsListApprovedByDateAndFilaDTO';
import TP from '../entities/TP';

class TPsRepository implements ITPsRepository {
  private ormRepository: Repository<TP>;

  constructor() {
    this.ormRepository = getRepository(TP, 'sigitm');
  }

  public async findByDataInicioPrevAndTipoRede(
    { daysBefore, daysAfter, tipoRede1, tipoRede2 }: ILoadTPsListDTO,
    options: FindManyOptions<TP> | undefined,
  ): Promise<TP[]> {
    const tps = await this.ormRepository.find({
      select: options?.select,
      relations: options?.relations,
      where: (qb: WhereExpression) => {
        qb.where(
          new Brackets((qbRede: WhereExpression) => {
            qbRede
              .where(`TP.TQP_DATA_PREV_INICIO >= TRUNC(sysdate-${daysBefore})`)
              .andWhere(
                `TP.TQP_DATA_PREV_INICIO < TRUNC(sysdate+${daysAfter})`,
              );
          }),
        ).andWhere(
          new Brackets((qbRede: WhereExpression) => {
            qbRede
              .where('TP.idTipoRede = :tipoRede1', { tipoRede1 })
              .orWhere('TP.idTipoRede = :tipoRede2', { tipoRede2 });
          }),
        );
      },
    });

    return tps.map(tp => classToClass(tp));
  }

  public async findByIds(
    ids: number[],
    options: FindManyOptions<TP> | undefined,
  ): Promise<TP[]> {
    const tps = await this.ormRepository.findByIds(ids, options);

    return tps.map(tp => classToClass(tp));
  }

  public async findById(
    id: number,
    options?: FindOneOptions<TP> | undefined,
  ): Promise<TP | undefined> {
    const tp = await this.ormRepository.findOne(id, options);
    return classToClass(tp);
  }

  public async findApprovedByDateAndFila(
    { daysBefore, daysAfter, fila }: ILoadTPsListApprovedByDateAndFilaDTO,
    options: FindManyOptions<TP> | undefined,
  ): Promise<TP[]> {
    const tps = await this.ormRepository.find({
      select: options?.select,
      relations: options?.relations,
      where: (qb: WhereExpression) => {
        qb.where(
          new Brackets((qbRede: WhereExpression) => {
            qbRede
              .where(`TP.TQP_DATA_PREV_INICIO >= TRUNC(sysdate-${daysBefore})`)
              .andWhere(
                `TP.TQP_DATA_PREV_INICIO < TRUNC(sysdate+${daysAfter})`,
              );
          }),
        )
          .andWhere(
            new Brackets((qbRede: WhereExpression) => {
              qbRede
                .where('TP.idTipoRede = :tipoRede1', { tipoRede1: 304 })
                .orWhere('TP.idTipoRede = :tipoRede2', { tipoRede2: 305 });
            }),
          )
          .andWhere(
            new Brackets((qbRede: WhereExpression) => {
              qbRede.where('"TP__ciente__grupo"."GRP_CODIGO" = :fila', {
                fila,
              });
            }),
          )
          .andWhere(
            new Brackets((qbRede: WhereExpression) => {
              qbRede.where('"TP__status"."STP_CODIGO" > :status', {
                status: 40,
              });
            }),
          );
      },
    });

    return tps.map(tp => classToClass(tp));
  }
}

export default TPsRepository;
