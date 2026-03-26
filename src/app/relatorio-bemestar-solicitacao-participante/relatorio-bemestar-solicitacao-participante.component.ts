import { UserService } from './../service/user.service';
import { User } from './../model/User';
import { Turma } from './../model/Tuma';
import { AlertModelService } from './../shared/alert-model.service';
import { RelatoriosService } from './../service/relatorios.service';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-bemestar-solicitacao-participante',
  templateUrl: './relatorio-bemestar-solicitacao-participante.component.html',
  styleUrls: ['./relatorio-bemestar-solicitacao-participante.component.css']
})
export class RelatorioBemestarSolicitacaoParticipanteComponent implements OnInit {

  formSolicitacao: FormSolicitaRelatorio = new FormSolicitaRelatorio()
  listaFormSolicitacao: FormSolicitaRelatorio[]
  idTurma: number
  dataIn: string
  dataEnd: string
  filtro: boolean = false
  percent
  dataInicio
  dataFinal

  user: User = new User()
  listaUser: User[]
  idUser: number

  turma: Turma = new Turma()
  listaTurma: Turma[]

  constructor(
    private relatorioSevice: RelatoriosService,
    private alert: AlertModelService,
    private userService: UserService
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

  findAllUser(){
    this.userService.getAllUsers().subscribe((resp: User[])=>{
      this.listaUser = resp
    })
  }

  findByIdUser(){
    this.userService.getUserById(this.idUser).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  // Solicitações por turma

  findSolicitacaoByTurmaEData() {
    if (this.idUser == null || this.dataIn == undefined || this.dataEnd == undefined) {
      this.alert.showAlertDanger('Preencha todos os campos antes de filtrar')
    } else {
      this.relatorioSevice.getSolicitacoesByDataEUser(this.idUser, this.dataIn, this.dataEnd).subscribe((resp: FormSolicitaRelatorio) => {
        this.formSolicitacao = resp
        this.percent = this.formSolicitacao.percent.toFixed(2)
        this.filtro = true
        if (this.formSolicitacao.qtd == 0) {
          this.alert.showAlertInfo('Não existem solicitações para esse participante')
          this.filtro = false
        }
      })
    }
  }

}
