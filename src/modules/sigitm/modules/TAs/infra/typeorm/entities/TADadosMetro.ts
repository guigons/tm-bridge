import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'SIGITM3', name: 'TBL_TA_DADOS_METRO' })
export default class TADadosMetro {
  @PrimaryGeneratedColumn({ name: 'TAK_CODIGO' })
  id: number;

  @Column({ name: 'TAK_TA' })
  ta_id: number;

  @Column({ name: 'TAK_FABRICANTE' })
  fabricante: string;

  @Column({ name: 'TAK_HOSTNAME' })
  hostname: string;

  @Column({ name: 'TAK_MODELO' })
  modelo: string;
}
