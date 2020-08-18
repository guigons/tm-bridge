import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'SIGITM3', name: 'TBL_TP_EQUIPAMENTO' })
export default class TPEquipamento {
  @PrimaryGeneratedColumn({ name: 'PEQ_CODIGO' })
  id: number;

  @Column({ name: 'PEQ_TP' })
  tp_id: number;

  @Column({ name: 'PEQ_FABRICANTE' })
  fabricante: string;

  @Column({ name: 'PEQ_HOSTNAME' })
  hostname: string;
}
