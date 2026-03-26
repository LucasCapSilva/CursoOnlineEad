import { DemandasRelatorio } from './../model/DemandasRelatorio';
import { DemandasBemEstar } from './../model/DemandasBemEstar';
import { RelatoriosService } from './../service/relatorios.service';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Turma } from './../model/Tuma';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-bemestar-pos-demanda-turma',
  templateUrl: './relatorio-bemestar-pos-demanda-turma.component.html',
  styleUrls: ['./relatorio-bemestar-pos-demanda-turma.component.css']
})
export class RelatorioBemestarPosDemandaTurmaComponent implements OnInit {

  turma: Turma = new Turma()
  listaTurma: Turma[]
  idTurma: number

  dataIn: string
  dataEnd: string

  formSolicitacao: FormSolicitaRelatorio = new FormSolicitaRelatorio()
  listaFormSolicitacao: FormSolicitaRelatorio[]

  demandas: DemandasRelatorio = new DemandasRelatorio()
  listaDemandas: DemandasRelatorio[]

  filtro: boolean = false
  percent
  dataInicio
  dataFinal

  constructor(
    private relatorioSevice: RelatoriosService
  ) { }

  ngOnInit() {

    this.findAllTurma()

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

  findDemandasByTurmaEData(){
    this.relatorioSevice.getDemandasByTurmaEData(this.idTurma, this.dataIn, this.dataEnd).subscribe((resp: DemandasRelatorio)=> {
      this.demandas = resp
      this.filtro = true
    })
  }

}
