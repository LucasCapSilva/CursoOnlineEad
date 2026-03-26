import { AlertModelService } from './../shared/alert-model.service';
import { RelatoriosService } from './../service/relatorios.service';
import { Turma } from './../model/Tuma';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-bemestar-solicitacao-turma',
  templateUrl: './relatorio-bemestar-solicitacao-turma.component.html',
  styleUrls: ['./relatorio-bemestar-solicitacao-turma.component.css']
})
export class RelatorioBemestarSolicitacaoTurmaComponent implements OnInit {

  formSolicitacao: FormSolicitaRelatorio = new FormSolicitaRelatorio()
  listaFormSolicitacao: FormSolicitaRelatorio[]
  idTurma: number
  dataIn: string
  dataEnd: string

  percent
  dataInicio
  dataFinal

  filtro: boolean = false

  turma: Turma = new Turma()
  listaTurma: Turma[]

  constructor(
    private relatorioSevice: RelatoriosService,
    private alert: AlertModelService
  ) { }

  ngOnInit() {

    this.findAllTurma()
    this.findAllSolicitacaoByTurmaEData()
  }

  findByIdTurma() {
    this.relatorioSevice.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp
    })
  }

  findAllTurma() {
    this.relatorioSevice.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      this.listaTurma = resp
    })
  }

  // Solicitações por turma

  findSolicitacaoByTurmaEData() {
    if (this.idTurma == null || this.dataIn == undefined || this.dataEnd == undefined) {
      this.alert.showAlertDanger('Preencha todos os campos antes de filtrar')
    } else {
      this.relatorioSevice.getSolicitacaoByDataETurma(this.idTurma, this.dataIn, this.dataEnd).subscribe((resp: FormSolicitaRelatorio) => {
        this.formSolicitacao = resp
        this.percent = this.formSolicitacao.percent.toFixed(2)
        this.filtro = true
        if (this.formSolicitacao.qtd == 0) {
          this.alert.showAlertInfo('Não existem solicitações para essa turma')
          this.findAllSolicitacaoByTurmaEData()
        }
      })
    }
  }

  findAllSolicitacaoByTurmaEData() {
    let data = new Date

    let dateEnd = data.toLocaleString()
    data.setDate(data.getDate() - 30)
    let dateIn = data.toLocaleString()

    this.dataInicio = dateIn.substr(6, 4) + '-' + dateIn.substr(3, 2) + '-' + dateIn.substr(0, 2)
    this.dataFinal = dateEnd.substr(6, 4) + '-' + dateEnd.substr(3, 2) + '-' + dateEnd.substr(0, 2)

    this.listaFormSolicitacao = []

    this.relatorioSevice.getAllSolicitacaoByData(this.dataInicio, this.dataFinal).subscribe((resp: FormSolicitaRelatorio[]) => {
      resp.forEach((i) => {
        if (i.percent != 0) {
          i.percent = Number(i.percent.toFixed(2))
          this.listaFormSolicitacao.push(i)
        }
      })
      this.filtro = false
    })
  }


}
