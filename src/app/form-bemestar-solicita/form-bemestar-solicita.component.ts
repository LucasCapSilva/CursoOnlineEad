import { environment } from './../../environments/environment.prod';
import { FormBemEstarSolicita } from './../model/FormBemEstarSolicita';
import { RelatoriosService } from './../service/relatorios.service';
import { AlertModelService } from './../shared/alert-model.service';
import { UserService } from './../service/user.service';
import { CursosService } from './../service/cursos.service';
import { BemestarService } from './../service/bemestar.service';
import { Router } from '@angular/router';
import { DemandasBemEstar } from './../model/DemandasBemEstar';
import { Curso } from './../model/Curso';
import { Turma } from './../model/Tuma';
import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-bemestar-solicita',
  templateUrl: './form-bemestar-solicita.component.html',
  styleUrls: ['./form-bemestar-solicita.component.css']
})
export class FormBemestarSolicitaComponent implements OnInit {

  form: FormBemEstarSolicita = new FormBemEstarSolicita()

  user: User = new User()
  listaUser: User[]
  idUser: number

  userSolicita: User = new User()
  idUserSolicita: number

  listaUserByProfile: User[]

  turma: Turma = new Turma()
  listaTurma: Turma[]
  idTurma: number

  curso: Curso = new Curso()
  listaCurso: Curso[]
  idCurso: number

  listaProfile: string[]
  listaPrioridade: string[]

  demanda: DemandasBemEstar = new DemandasBemEstar()



  constructor(
    private router: Router,
    private bemestarService: BemestarService,
    private cursoService: CursosService,
    private userService: UserService,
    private alert: AlertModelService,
    private relatorioService: RelatoriosService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.findAllUser()
    this.findAllTurma()
    this.findAllCurso()
    this.findAllProfile()
    this.findByIdProfile()
    this.findAllPrioridades()



  }

  findAllProfile(){
    this.listaProfile = []
    this.userService.getUserByProfileAll().subscribe((resp: [])=>{

      resp.forEach((i)=>{
        let nome = String(i).substring(5)
        if(nome != 'STAFF' && nome != 'ADMIN'){
          this.listaProfile.push(nome)
        }
      })

    })
  }



 findByIdProfile(){
    this.userService.getUserByProfileByRole('ROLE_BEMESTAR').subscribe((resp: User[])=>{
      this.listaUserByProfile = resp
    })
  }


  findAllUser(){
    this.userService.getAllUsers().subscribe((resp: User[])=>{
      this.listaUser = resp
    })
  }

  findByIdUserAssistente(){
    this.userService.getUserById(this.idUserSolicita).subscribe((resp: User)=>{
      this.userSolicita = resp
    })
  }

  findByIdUser(){
    this.userService.getUserById(this.idUser).subscribe((resp: User)=>{
      this.user = resp
    })
  }



  findAllTurma(){
    this.relatorioService.getAllTurmaCombo().subscribe((resp: Turma[])=>{
      this.listaTurma = resp
    })
  }

  findByIdTurma(){
    this.relatorioService.getByIdTurma(this.idTurma).subscribe((resp: Turma)=>{
      this.turma = resp
    })
  }

  findAllCurso(){
    this.cursoService.getAllCursos().subscribe((resp: Curso[])=>{
      this.listaCurso = resp
    })
  }

  findByIdCurso(){
    this.cursoService.getByIdCurso(this.idCurso).subscribe((resp: Curso)=>{
      this.curso = resp
    })
  }

  findAllPrioridades(){
    this.userService.getUserByPrioridadesAll().subscribe((resp: [])=>{
      this.listaPrioridade = resp
    })
  }

  vulnerabilidade(ev){
    this.form.nivelUrgencia = ev.target.value
  }

  finalizar(){
/*
    this.userService.getUserById(environment.idUsuario).subscribe((resp: User)=>{
      this.userSolicita = resp
      this.form.solicitante = this.userSolicita
    }) */

    this.userSolicita.id = environment.idUsuario
    this.form.solicitante = this.userSolicita

    this.user.id = this.idUser
    this.form.usuario = this.user

    this.turma.id = this.idTurma
    this.turma.curso = null;
    this.form.turma = this.turma

    this.bemestarService.postFormSolicita(this.form).subscribe((resp: FormBemEstarSolicita)=>{
      this.form = resp
      this.alert.showAlertSuccess('Solicitação registrada com sucesso!')
      this.router.navigate(['/home'])
    })
  }
}
