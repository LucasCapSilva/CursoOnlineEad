import { RelatoriosService } from './../service/relatorios.service';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-relatorio-bemestar-pos-solicitacao-area',
  templateUrl: './relatorio-bemestar-pos-solicitacao-area.component.html',
  styleUrls: ['./relatorio-bemestar-pos-solicitacao-area.component.css']
})
export class RelatorioBemestarPosSolicitacaoAreaComponent implements OnInit {

  dataIn: string
  dataEnd: string

  formSolicitacao: FormSolicitaRelatorio = new FormSolicitaRelatorio()
  listaFormSolicitacao: FormSolicitaRelatorio[]

  filtro: boolean = false
  percent

  constructor(
    private relatorioSevice: RelatoriosService
  ) { }

  ngOnInit() {
  }

  findSolicitacaoByArea(){
    this.listaFormSolicitacao = []
    this.relatorioSevice.getSolicitacoesByArea(this.dataIn, this.dataEnd).subscribe((resp: FormSolicitaRelatorio[])=>{
      resp.forEach((i) => {
        if (i.percent != 0) {
          i.percent = Number(i.percent.toFixed(2))
          i.descricao = String(i.descricao).substring(5)
          this.listaFormSolicitacao.push(i)
        }
      })
      this.filtro = true

    })
  }

}
