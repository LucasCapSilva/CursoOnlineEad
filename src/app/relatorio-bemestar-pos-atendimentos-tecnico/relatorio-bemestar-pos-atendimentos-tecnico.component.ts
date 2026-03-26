import { UserService } from './../service/user.service';
import { AlertModelService } from './../shared/alert-model.service';
import { RelatoriosService } from './../service/relatorios.service';
import { User } from './../model/User';
import { FormBemEstarPos } from './../model/FormBemEstarPos';
import { FormSolicitaRelatorio } from './../model/FormSolicitaRelatorio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-bemestar-pos-atendimentos-tecnico',
  templateUrl: './relatorio-bemestar-pos-atendimentos-tecnico.component.html',
  styleUrls: ['./relatorio-bemestar-pos-atendimentos-tecnico.component.css']
})
export class RelatorioBemestarPosAtendimentosTecnicoComponent implements OnInit {

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
  listaUsers: User[]
  idUser: number



  constructor(
    private relatorioSevice: RelatoriosService,
    private alert: AlertModelService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.findAllUser()
  }


  findAllUser(){
    this.listaUsers = []
    this.userService.getAllUsers().subscribe((resp: User[])=>{
      resp.forEach((i)=>{
        if(i.profile == "ROLE_BEMESTAR"){
          this.listaUsers.push(i)
        }
      })

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
      this.relatorioSevice.getAtendimentoByTecnico(this.idUser, this.dataIn, this.dataEnd).subscribe((resp: FormSolicitaRelatorio) => {
        this.formSolicitacao = resp
        this.percent = this.formSolicitacao.percent.toFixed(2)
        this.filtro = true
        if (this.formSolicitacao.qtd == 0) {
          this.alert.showAlertInfo('Não existem atendimentos.')
          this.filtro = false
        }
      })
    }
  }
}
