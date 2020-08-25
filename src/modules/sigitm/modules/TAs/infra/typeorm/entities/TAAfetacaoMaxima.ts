import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import TA from './TA';

@Entity({ database: 'SIGITM3', name: 'AFETACAO_MAXIMA_TA' })
export default class TAAfetacaoMaxima {
  @PrimaryGeneratedColumn({ name: 'SEQUENCIA' })
  id: number;

  @Column({ name: 'TQA_RAIZ' })
  ta_raiz_id: number;

  @Column({ name: 'TRANSMISSAO' })
  transmissao: number;

  @Column({ name: 'VOZ' })
  voz: number;

  @Column({ name: 'DETERMINISTICA' })
  deterministica: number;

  @Column({ name: 'SPEEDY' })
  speedy: number;

  @Column({ name: 'CLIENTE' })
  cliente: number;

  @Column({ name: 'CP' })
  cp: number;

  @Column({ name: 'REDE_IP' })
  rede_ip: number;

  @Column({ name: 'INTERCONEXAO' })
  interconexao: number;

  @Column({ name: 'SPPAC' })
  sppac: number;

  @Column({ name: 'DTH' })
  dth: number;

  @Column({ name: 'FTTX' })
  fttx: number;

  @Column({ name: 'IPTV' })
  iptv: number;

  @Column({ name: 'SOMA' })
  soma: number;

  @Column({ name: 'DT_ULT_AFETACAO' })
  data_ultima_afetacao: Date;

  @ManyToOne(() => TA, ta => ta.afetacao_maxima)
  @JoinColumn({
    name: 'TQA_RAIZ',
    referencedColumnName: 'raiz',
  })
  TA: TA;
}
