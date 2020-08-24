import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import SigitmUsuario from '@modules/sigitm/infra/typeorm/entities/SigitmUsuario';
import SigitmGrupo from '@modules/sigitm/infra/typeorm/entities/SigitmGrupo';
import { Exclude, Expose } from 'class-transformer';
import TAStatus from './TAStatus';
import TATipoRede from './TATipoRede';
import TADadosIP from './TADadosIP';
import TABaixa from './TABaixa';
import TAHistorico from './TAHistorico';
import TAEquipamento from './TAEquipamento';
import TADadosMetro from './TADadosMetro';

export interface IEquipamento {
  id: number;
  hostname: string;
  fabricante: string;
  modelo: string;
}

@Entity({ database: 'SIGITM3', name: 'TBL_TA' })
export default class TA {
  @PrimaryGeneratedColumn({ name: 'TQA_CODIGO' })
  id: number;

  @Column({ name: 'TQA_RAIZ' })
  raiz: number;

  @Column({ name: 'TQA_SEVERIDADE' })
  severidade: number;

  @Column({ name: 'TQA_LOCALIDADE_NOME' })
  regiao: string;

  @Column({ name: 'TQA_DATA_CRIACAO' })
  dataCriacao: Date;

  @Column({ name: 'TQA_DATA_ENCERRAMENTO' })
  dataEncerramento: Date;

  @Column({ name: 'TQA_TIPO_BILHETE' })
  tipoBilhete: string;

  @Column({ name: 'TQA_ALARME_TIPO' })
  alarmeTipo: string;

  @Column({ name: 'TQA_ALARME' })
  alarme: string;

  @Column({ name: 'TQA_TIPO_FALHA' })
  tipoFalha: string;

  @Column({ name: 'TQA_STATUS' })
  idStatus: number;

  @Column({ name: 'TQA_TIPO_REDE' })
  idTipoRede: number;

  @Exclude()
  @OneToOne(() => TADadosIP)
  @JoinColumn({
    name: 'TQA_CODIGO',
    referencedColumnName: 'ta_id',
  })
  dadosIP: TADadosIP;

  @Exclude()
  @OneToOne(() => TADadosMetro)
  @JoinColumn({
    name: 'TQA_CODIGO',
    referencedColumnName: 'ta_id',
  })
  dadosMetro: TADadosMetro;

  @Exclude()
  @OneToOne(() => TAEquipamento)
  @JoinColumn({
    name: 'TQA_CODIGO',
    referencedColumnName: 'ta_id',
  })
  dadosEquipamento: TAEquipamento;

  @ManyToOne(() => SigitmUsuario)
  @JoinColumn({
    name: 'TQA_RESPONSAVELPOR_USUARIO',
    referencedColumnName: 'id',
  })
  responsavel: SigitmUsuario;

  @ManyToOne(() => SigitmGrupo)
  @JoinColumn({
    name: 'TQA_RESPONSAVELPOR_GRUPO',
    referencedColumnName: 'id',
  })
  fila: SigitmGrupo;

  @ManyToOne(() => SigitmUsuario)
  @JoinColumn({
    name: 'TQA_CRIADOPOR_USUARIO',
    referencedColumnName: 'id',
  })
  criador: SigitmUsuario;

  @ManyToOne(() => SigitmGrupo)
  @JoinColumn({
    name: 'TQA_CRIADOPOR_GRUPO',
    referencedColumnName: 'id',
  })
  grupoCriador: SigitmGrupo;

  @ManyToOne(() => TAStatus)
  @JoinColumn({
    name: 'TQA_STATUS',
    referencedColumnName: 'id',
  })
  status: TAStatus;

  @ManyToOne(() => TATipoRede)
  @JoinColumn({
    name: 'TQA_TIPO_REDE',
    referencedColumnName: 'id',
  })
  rede: TATipoRede;

  @ManyToOne(() => TABaixa)
  @JoinColumn({
    name: 'TQA_CODIGO',
    referencedColumnName: 'ta_id',
  })
  baixa: TABaixa;

  // eslint-disable-next-line prettier/prettier
  @OneToMany(() => TAHistorico, historico => historico.TA)
  historicos: TAHistorico[];

  @Expose({ name: 'equipamentos' })
  getEquipamento(): IEquipamento[] {
    const equipamentos: IEquipamento[] = [];
    if (this.dadosIP) {
      equipamentos.push({
        id: this.dadosIP.id,
        hostname: this.dadosIP.hostname,
        fabricante: this.dadosIP.fabricante,
        modelo: this.dadosIP.modelo,
      });
    }
    if (this.dadosMetro) {
      equipamentos.push({
        id: this.dadosMetro.id,
        hostname: this.dadosMetro.hostname,
        fabricante: this.dadosMetro.fabricante,
        modelo: this.dadosMetro.modelo,
      });
    }
    if (this.dadosEquipamento) {
      equipamentos.push({
        id: this.dadosEquipamento.id,
        hostname: this.dadosEquipamento.hostname,
        fabricante: this.dadosEquipamento.fabricante,
        modelo: this.dadosEquipamento.modelo,
      });
    }
    return equipamentos;
  }
}
