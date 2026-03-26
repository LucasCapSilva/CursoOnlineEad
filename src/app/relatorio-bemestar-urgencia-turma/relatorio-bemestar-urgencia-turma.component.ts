import { AlertModelService } from './../shared/alert-model.service';
import { RelatoriosService } from './../service/relatorios.service';
import { Turma } from './../model/Tuma';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-bemestar-urgencia-turma',
  templateUrl: './relatorio-bemestar-urgencia-turma.component.html',
  styleUrls: ['./relatorio-bemestar-urgencia-turma.component.css']
})
export class RelatorioBemestarUrgenciaTurmaComponent implements OnInit {

  formSolicitacao: FormSolicitaRelatorio = new FormSolicitaRelatorio()
  listaFormSolicitacao: FormSolicitaRelatorio[]
  listaFormSolicitacaoFiltro: FormSolicitaRelatorio[]
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
    this.findAllUrgenciaByTurmaEData()
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

  findUrgenciaByTurmaEData() {
    this.listaFormSolicitacaoFiltro = []
    if (this.idTurma == null || this.dataIn == '' || this.dataEnd == '') {
      this.alert.showAlertDanger('Preencha todos os campos antes de filtrar')
    } else {
      this.relatorioSevice.getUrgenciaByDataETurma(this.idTurma, this.dataIn, this.dataEnd).subscribe((resp: FormSolicitaRelatorio[]) => {
        resp.forEach((i)=>{
          if (i.percent != 0) {
            i.percent = Number(i.percent.toFixed(2))
            this.listaFormSolicitacaoFiltro.push(i)
          }
        })
        if (this.listaFormSolicitacaoFiltro.length == 0) {
          this.alert.showAlertInfo('Não existem solicitações para essa turma')
          this.findAllUrgenciaByTurmaEData()
        }
        this.filtro = true
      })
    }
  }

  findAllUrgenciaByTurmaEData() {
    let data = new Date

    let dateEnd = data.toLocaleString()
    data.setDate(data.getDate() - 30)
    let dateIn = data.toLocaleString()

    this.dataInicio = dateIn.substr(6, 4) + '-' + dateIn.substr(3, 2) + '-' + dateIn.substr(0, 2)
    this.dataFinal = dateEnd.substr(6, 4) + '-' + dateEnd.substr(3, 2) + '-' + dateEnd.substr(0, 2)

    this.listaFormSolicitacao = []

    this.relatorioSevice.getAllUrgenciacaoByData(this.dataInicio, this.dataFinal).subscribe((resp: FormSolicitaRelatorio[]) => {
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
