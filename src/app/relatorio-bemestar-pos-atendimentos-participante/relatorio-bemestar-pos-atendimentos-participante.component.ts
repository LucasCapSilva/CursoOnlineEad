import { FormBemEstarPos } from './../model/FormBemEstarPos';
import { UserService } from './../service/user.service';
import { AlertModelService } from './../shared/alert-model.service';
import { RelatoriosService } from './../service/relatorios.service';
import { Turma } from './../model/Tuma';
import { User } from './../model/User';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-bemestar-pos-atendimentos-participante',
  templateUrl: './relatorio-bemestar-pos-atendimentos-participante.component.html',
  styleUrls: ['./relatorio-bemestar-pos-atendimentos-participante.component.css']
})
export class RelatorioBemestarPosAtendimentosParticipanteComponent implements OnInit {

  formSolicitacao: FormSolicitaRelatorio = new FormSolicitaRelatorio()
  listaFormSolicitacao: FormSolicitaRelatorio[]
  idTurma: number
  dataIn: string
  dataEnd: string
  filtro: boolean = false
  percent
  dataInicio
  dataFinal

  form: FormBemEstarPos = new FormBemEstarPos()
  listaForms: FormBemEstarPos[]

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

  findAtendimentoByTurmaEData() {
    if (this.idUser == null || this.dataIn == undefined || this.dataEnd == undefined) {
      this.alert.showAlertDanger('Preencha todos os campos antes de filtrar')
    } else {
      this.relatorioSevice.getAtendimentosByUser(this.idUser, this.dataIn, this.dataEnd).subscribe((resp: FormSolicitaRelatorio) => {
        this.formSolicitacao = resp
        this.percent = this.formSolicitacao.percent.toFixed(2)
        this.findFormsPosByUserEData()
        this.filtro = true
        if (this.formSolicitacao.qtd == 0) {
          this.alert.showAlertInfo('Não existem solicitações para esse participante')
          this.filtro = false
        }
      })
    }
  }

  findFormsPosByUserEData(){
    this.relatorioSevice.getPosByUserEData(this.idUser, this.dataIn, this.dataEnd).subscribe((resp: FormBemEstarPos[])=>{
      this.listaForms = resp
    })
  }

}
