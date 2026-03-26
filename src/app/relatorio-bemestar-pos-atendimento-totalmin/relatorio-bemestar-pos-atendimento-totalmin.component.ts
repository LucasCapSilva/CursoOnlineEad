import { HashLocationStrategy } from '@angular/common';
import { RelatoriosService } from './../service/relatorios.service';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Turma } from './../model/Tuma';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-bemestar-pos-atendimento-totalmin',
  templateUrl: './relatorio-bemestar-pos-atendimento-totalmin.component.html',
  styleUrls: ['./relatorio-bemestar-pos-atendimento-totalmin.component.css']
})
export class RelatorioBemestarPosAtendimentoTotalminComponent implements OnInit {

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
  horas: number

  constructor(
    private relatorioSevice: RelatoriosService
  ) { }

  ngOnInit() {

    this.findAllTurma()
    this.findAllTempoAtendimentoByTurma()

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

  findTempoAtendimentoByTurma(){
    this.relatorioSevice.getTempoAtendimentoByTurma(this.idTurma, this.dataIn, this.dataEnd).subscribe((resp: FormSolicitaRelatorio)=>{
      this.formSolicitacao = resp
      let h = this.formSolicitacao.qtd / 60
      this.horas = Number(h.toFixed(2))
      this.filtro = true
    })
  }

  findAllTempoAtendimentoByTurma() {
    let data = new Date

    let dateEnd = data.toLocaleString()
    data.setDate(data.getDate() - 30)
    let dateIn = data.toLocaleString()

    this.dataInicio = dateIn.substr(6, 4) + '-' + dateIn.substr(3, 2) + '-' + dateIn.substr(0, 2)
    this.dataFinal = dateEnd.substr(6, 4) + '-' + dateEnd.substr(3, 2) + '-' + dateEnd.substr(0, 2)

    this.listaFormSolicitacao = []

    this.relatorioSevice.getAllTempoAtendimentoByTurma(this.dataInicio, this.dataFinal).subscribe((resp: FormSolicitaRelatorio[]) => {
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
