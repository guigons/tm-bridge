import { FindManyOptions, FindOneOptions } from 'typeorm';
import TP from '../infra/typeorm/entities/TP';

import ILoadTPsListDTO from '../dtos/ILoadTPsListDTO';
import ILoadTPsListApprovedByDateAndFilaDTO from '../dtos/ILoadTPsListApprovedByDateAndFilaDTO';

export default interface ITPsRepository {
  findByDataInicioPrevAndTipoRede(
    data: ILoadTPsListDTO,
    options?: FindManyOptions<TP> | undefined,
  ): Promise<TP[]>;
  findApprovedByDateAndFila(
    data: ILoadTPsListApprovedByDateAndFilaDTO,
    options?: FindManyOptions<TP> | undefined,
  ): Promise<TP[]>;
  findByIds(
    ids: number[],
    options?: FindManyOptions<TP> | undefined,
  ): Promise<TP[]>;
  findById(
    id: number,
    options?: FindOneOptions<TP> | undefined,
  ): Promise<TP | undefined>;
}
