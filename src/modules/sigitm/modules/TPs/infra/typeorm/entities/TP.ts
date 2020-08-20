import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import SigitmUsuario from '@modules/sigitm/infra/typeorm/entities/SigitmUsuario';
import SigitmGrupo from '@modules/sigitm/infra/typeorm/entities/SigitmGrupo';
import { Expose, Exclude } from 'class-transformer';
import TPStatus from './TPStatus';
import TPImpacto from './TPImpacto';
import TPAtividade from './TPAtividade';
import TPTipoRede from './TPTipoRede';
import TPTipoPlanta from './TPTipoPlanta';
import TPTipoTrabalho from './TPTipoTrabalho';
import TPEmpresa from './TPEmpresa';
import TPTipoAfetacao from './TPTipoAfetacao';
import TPMotivo from './TPMotivo';
import TPHistorico from './TPHistorico';
import TPDadosIP from './TPDadosIP';
import TPBaixa from './TPBaixa';
import TPCiente from './TPCiente';
import TPEquipamento from './TPEquipamento';
import TPDadosMetro from './TPDadosMetro';

export interface ICarimbo {
  codigo: string;
  descrição?: string;
  tipo?: string;
  categoria?: string;
  data: Date;
}

export interface IEquipamento {
  id: number;
  hostname: string;
  fabricante: string;
  modelo: string;
}

@Entity({ database: 'SIGITM3', name: 'TBL_TP' })
export default class TP {
  @PrimaryGeneratedColumn({ name: 'TQP_CODIGO' })
  id: number;

  @Column({ name: 'TQP_RAIZ' })
  tp_raiz: number;

  @Column({ name: 'TQP_ORIGEM' })
  tp_origem: number;

  @ManyToOne(() => TPStatus)
  @JoinColumn({
    name: 'TQP_STATUS',
    referencedColumnName: 'id',
  })
  status: TPStatus;

  @ManyToOne(() => TPImpacto)
  @JoinColumn({
    name: 'TQP_IMPACTO',
    referencedColumnName: 'id',
  })
  impacto: TPImpacto;

  @ManyToOne(() => TPAtividade)
  @JoinColumn({
    name: 'TQP_ATIVIDADE',
    referencedColumnName: 'id',
  })
  atividade: TPAtividade;

  @ManyToOne(() => TPTipoRede)
  @JoinColumn({
    name: 'TQP_TIPO_REDE',
    referencedColumnName: 'id',
  })
  rede: TPTipoRede;

  @Column({ name: 'TQP_TIPO_REDE' })
  idTipoRede: number;

  @ManyToOne(() => TPTipoPlanta)
  @JoinColumn({
    name: 'TQP_TIPO_PLANTA',
    referencedColumnName: 'id',
  })
  tipoPlanta: TPTipoPlanta;

  @Column({ name: 'TQP_LOCALIDADE_NOME' })
  localidade: string;

  @Column({ name: 'TQP_AREA_NOME' })
  areaNome: string;

  @Column({ name: 'TQP_GERENCIA_NOME' })
  gerencia: string;

  @Column({ name: 'TQP_ESCRITORIO_NOME' })
  escritorio: string;

  @Column({ name: 'TQP_PROJETO' })
  projeto: string;

  @ManyToOne(() => TPTipoTrabalho)
  @JoinColumn({
    name: 'TQP_TIPO_TRABALHO',
    referencedColumnName: 'id',
  })
  tipoTrabalho: TPTipoTrabalho;

  @ManyToOne(() => TPEmpresa)
  @JoinColumn({
    name: 'TQP_EMPRESA',
    referencedColumnName: 'id',
  })
  empresa: TPEmpresa;

  @Column({ name: 'TQP_DESCRICAO' })
  descricao: string;

  @Column({ name: 'TQP_EXEC_RESPONSAVEL' })
  executorResponsavel: string;

  @Column({ name: 'TQP_EXEC_TELEFONE' })
  executorTelefone: string;

  @Column({ name: 'TQP_EXEC_AREA_EMPRESA' })
  executorAreaEmpresa: string;

  @OneToOne(() => TPTipoAfetacao)
  @JoinColumn({
    name: 'TQP_TIPO_AFETACAO',
    referencedColumnName: 'id',
  })
  tipoAfetacao: TPTipoAfetacao;

  @ManyToOne(() => TPMotivo)
  @JoinColumn({
    name: 'TQP_MOTIVO',
    referencedColumnName: 'id',
  })
  motivo: TPMotivo;

  @ManyToOne(() => SigitmUsuario)
  @JoinColumn({
    name: 'TQP_CRIADOPOR_USUARIO',
    referencedColumnName: 'id',
  })
  criador: SigitmUsuario;

  @ManyToOne(() => SigitmGrupo)
  @JoinColumn({
    name: 'TQP_CRIADOPOR_GRUPO',
    referencedColumnName: 'id',
  })
  criadorGrupo: SigitmGrupo;

  @ManyToOne(() => SigitmUsuario)
  @JoinColumn({
    name: 'TQP_RESPONSAVELPOR_USUARIO',
    referencedColumnName: 'id',
  })
  responsavel: SigitmUsuario;

  @ManyToOne(() => SigitmGrupo)
  @JoinColumn({
    name: 'TQP_RESPONSAVELPOR_GRUPO',
    referencedColumnName: 'id',
  })
  fila: SigitmGrupo;

  @Column({ name: 'TQP_DATA_CRIACAO' })
  dataCriacao: Date;

  @Column({ name: 'TQP_DATA_PREV_INICIO' })
  dataInicioPrevisto: Date;

  @Column({ name: 'TQP_DATA_PREV_FIM' })
  dataFimPrevisto: Date;

  @Column({ name: 'TQP_DATA_PREV_AFET_INICIO' })
  dataInicioPrevistoAfetacao: Date;

  @Column({ name: 'TQP_DATA_PREV_AFET_FIM' })
  dataFimPrevistoAfetacao: Date;

  @Column({ name: 'TQP_DATA_EXEC_INICIO' })
  dataInicioExecutada: Date;

  @Column({ name: 'TQP_DATA_EXEC_FIM' })
  dataFimExecutada: Date;

  @Column({ name: 'TQP_DATA_EXEC_AFET_INICIO' })
  dataInicioExecutadaAfetacao: Date;

  @Column({ name: 'TQP_DATA_EXEC_AFET_FIM' })
  dataFimExecutadaAfetacao: Date;

  @Column({ name: 'TQP_DATA_ROLLBACK' })
  dataRollback: Date;

  @Column({ name: 'TQP_DATA_ENCERRAMENTO' })
  dataEncerramento: Date;

  @ManyToOne(() => SigitmUsuario)
  @JoinColumn({
    name: 'TQP_ENCERRADOPOR_USUARIO',
    referencedColumnName: 'id',
  })
  encerrador: SigitmUsuario;

  @ManyToOne(() => SigitmGrupo)
  @JoinColumn({
    name: 'TQP_ENCERRADOPOR_GRUPO',
    referencedColumnName: 'id',
  })
  encerradorGrupo: SigitmGrupo;

  @Column({ name: 'TQP_OCORRENCIA' })
  ocorrencia: string;

  @Column({ name: 'TQP_CONCLUSAO' })
  conclusao: string;

  @Column({ name: 'TQP_JUSTIFICATIVA' })
  justificativa: string;

  @Exclude()
  @OneToOne(() => TPDadosIP)
  @JoinColumn({
    name: 'TQP_CODIGO',
    referencedColumnName: 'tp_id',
  })
  dadosIP: TPDadosIP;

  @Exclude()
  @OneToOne(() => TPDadosMetro)
  @JoinColumn({
    name: 'TQP_CODIGO',
    referencedColumnName: 'tp_id',
  })
  dadosMetro: TPDadosMetro;

  @Exclude()
  @OneToOne(() => TPEquipamento)
  @JoinColumn({
    name: 'TQP_CODIGO',
    referencedColumnName: 'tp_id',
  })
  dadosEquipamento: TPEquipamento;

  @OneToOne(() => TPBaixa)
  @JoinColumn({
    name: 'TQP_CODIGO',
    referencedColumnName: 'tp_id',
  })
  baixa: TPBaixa;

  @OneToOne(() => TPCiente)
  @JoinColumn({
    name: 'TQP_CODIGO',
    referencedColumnName: 'tp_id',
  })
  ciente: TPCiente;

  @OneToMany(() => TPHistorico, historico => historico.TP)
  historicos: TPHistorico[];

  @Exclude()
  @ManyToOne(() => TP)
  @JoinColumn({
    name: 'TQP_ORIGEM',
    referencedColumnName: 'id',
  })
  parent: TP;

  @Exclude()
  @OneToMany(() => TP, tp => tp.parent)
  children: TP[];

  @Expose({ name: 'carimbos' })
  getCarimbos(): ICarimbo[] {
    if (!this.historicos) return [];
    const historicoCarimbos = this.historicos.filter(history =>
      history.texto.match(/(^|.*)(DE_|CA_|PB_)[0-9][0-9]/),
    );

    const carimbos: ICarimbo[] = historicoCarimbos.map(hd => {
      const extract = hd.texto.match(
        /^((DE_|CA_|PB_)[0-9][0-9])\s+(.*?)(\n|$)/,
      );
      const codigo = extract ? extract[1] : '';

      return {
        codigo,
        data: hd.data,
      };
    });

    return carimbos;
  }

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
    if (this.children) {
      this.children.forEach(c => {
        if (c.dadosIP) {
          equipamentos.push({
            id: c.dadosIP.id,
            hostname: c.dadosIP.hostname,
            fabricante: c.dadosIP.fabricante,
            modelo: c.dadosIP.modelo,
          });
        }
        if (c.dadosMetro) {
          equipamentos.push({
            id: c.dadosMetro.id,
            hostname: c.dadosMetro.hostname,
            fabricante: c.dadosMetro.fabricante,
            modelo: c.dadosMetro.modelo,
          });
        }
        if (c.dadosEquipamento) {
          equipamentos.push({
            id: c.dadosEquipamento.id,
            hostname: c.dadosEquipamento.hostname,
            fabricante: c.dadosEquipamento.fabricante,
            modelo: c.dadosEquipamento.modelo,
          });
        }
      });
    }
    return equipamentos;
  }

  carimbos: ICarimbo[];
}
