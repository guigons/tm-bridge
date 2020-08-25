import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import SigitmUsuario from '@modules/sigitm/infra/typeorm/entities/SigitmUsuario';
import SigitmGrupo from '@modules/sigitm/infra/typeorm/entities/SigitmGrupo';
import TA from './TA';

@Entity({ database: 'SIGITM3', name: 'TBL_TA_AFETACAO_PARCIAL' })
export default class TAAfetacaoParcial {
  @PrimaryGeneratedColumn({ name: 'AAP_CODIGO' })
  id: number;

  @Column({ name: 'AAP_DATA' })
  data: Date;

  @Column({ name: 'AAP_TA' })
  ta_id: number;

  @ManyToOne(() => SigitmGrupo)
  @JoinColumn({
    name: 'AAP_GRUPO',
    referencedColumnName: 'id',
  })
  grupo: SigitmGrupo;

  @ManyToOne(() => SigitmUsuario)
  @JoinColumn({
    name: 'AAP_USUARIO',
    referencedColumnName: 'id',
  })
  usuario: SigitmUsuario;

  @Column({ name: 'AAP_TRANSMISSAO' })
  transmissao: number;

  @Column({ name: 'AAP_VOZ' })
  voz: number;

  @Column({ name: 'AAP_DETERMINISTICA' })
  deterministica: number;

  @Column({ name: 'AAP_SPEEDY' })
  speedy: number;

  @Column({ name: 'AAP_CLIENTE' })
  cliente: number;

  @Column({ name: 'AAP_CP' })
  cp: number;

  @Column({ name: 'AAP_REDEIP' })
  rede_ip: number;

  @Column({ name: 'AAP_INTERCONEXAO' })
  interconexao: number;

  @Column({ name: 'AAP_SPPAC' })
  sppac: number;

  @Column({ name: 'AAP_DTH' })
  dth: number;

  @Column({ name: 'AAP_FTTX' })
  fttx: number;

  @Column({ name: 'AAP_IPTV' })
  iptv: number;

  @Column({ name: 'AAP_ERB' })
  erb: number;

  @ManyToOne(() => TA, ta => ta.afetacao_maxima)
  @JoinColumn({
    name: 'AAP_TA',
    referencedColumnName: 'id',
  })
  TA: TA;
}
