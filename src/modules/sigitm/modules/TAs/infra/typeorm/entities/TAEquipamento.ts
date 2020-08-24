import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'SIGITM3', name: 'TBL_TA_EQUIPAMENTO' })
export default class TAEquipamento {
  @PrimaryGeneratedColumn({ name: 'AEQ_CODIGO' })
  id: number;

  @Column({ name: 'AEQ_TA' })
  ta_id: number;

  @Column({ name: 'AEQ_FABRICANTE' })
  fabricante: string;

  @Column({ name: 'AEQ_HOSTNAME' })
  hostname: string;

  @Column({ name: 'AEQ_MODELO' })
  modelo: string;
}
