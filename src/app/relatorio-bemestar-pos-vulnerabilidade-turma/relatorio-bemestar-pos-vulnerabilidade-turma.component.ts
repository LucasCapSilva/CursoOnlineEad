import { RelatoriosService } from './../service/relatorios.service';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Turma } from './../model/Tuma';
import { Component, OnInit } from '@angular/core';
import { AlertModelService } from '../shared/alert-model.service';

@Component({
  selector: 'app-relatorio-bemestar-pos-vulnerabilidade-turma',
  templateUrl: './relatorio-bemestar-pos-vulnerabilidade-turma.component.html',
  styleUrls: ['./relatorio-bemestar-pos-vulnerabilidade-turma.component.css']
})
export class RelatorioBemestarPosVulnerabilidadeTurmaComponent implements OnInit {

  turma: Turma = new Turma()
  listaTurma: Turma[]
  idTurma: number

  dataIn: string
  dataEnd: string

  formSolicitacao: FormSolicitaRelatorio = new FormSolicitaRelatorio()
  listaFormSolicitacao: FormSolicitaRelatorio[]

  filtro: boolean = false
  percent
  dataInicio
  dataFinal

  constructor(
    private relatorioSevice: RelatoriosService,
    private alert: AlertModelService
  ) { }

  ngOnInit() {

    this.findAllTurma()
    this.findAllPosByData()

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

  findPosByTurma(){
    this.listaFormSolicitacao = []
    this.relatorioSevice.getVulnerabilidadeByTurmaEData(this.idTurma, this.dataIn, this.dataEnd).subscribe((resp: FormSolicitaRelatorio[])=>{
      resp.forEach((i) => {
        if (i.percent != 0) {
          i.percent = Number(i.percent.toFixed(2))
          this.listaFormSolicitacao.push(i)
        }
      })

      if(this.listaFormSolicitacao.length == 0) {
          this.alert.showAlertInfo('Não existem atendimentos para essa turma e/ou período.')
      }
      this.filtro = true
    })
  }

  findAllPosByData() {
    let data = new Date

    let dateEnd = data.toLocaleString()
    data.setDate(data.getDate() - 30)
    let dateIn = data.toLocaleString()

    this.dataInicio = dateIn.substr(6, 4) + '-' + dateIn.substr(3, 2) + '-' + dateIn.substr(0, 2)
    this.dataFinal = dateEnd.substr(6, 4) + '-' + dateEnd.substr(3, 2) + '-' + dateEnd.substr(0, 2)

    this.listaFormSolicitacao = []

    this.relatorioSevice.getVulnerabilidadeByData(this.dataInicio, this.dataFinal).subscribe((resp: FormSolicitaRelatorio[]) => {
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
