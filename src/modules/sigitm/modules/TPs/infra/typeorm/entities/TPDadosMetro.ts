import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'SIGITM3', name: 'TBL_TP_DADOS_METRO' })
export default class TPDadosMetro {
  @PrimaryGeneratedColumn({ name: 'TGK_CODIGO' })
  id: number;

  @Column({ name: 'TGK_TP' })
  tp_id: number;

  @Column({ name: 'TGK_FABRICANTE' })
  fabricante: string;

  @Column({ name: 'TGK_MODELO' })
  modelo: string;

  @Column({ name: 'TGK_HOSTNAME' })
  hostname: string;
}
