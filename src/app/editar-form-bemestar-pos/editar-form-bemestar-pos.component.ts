import { environment } from './../../environments/environment.prod';
import { RelatoriosService } from './../service/relatorios.service';
import { AlertModelService } from './../shared/alert-model.service';
import { UserService } from './../service/user.service';
import { CursosService } from './../service/cursos.service';
import { BemestarService } from './../service/bemestar.service';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { DemandasBemEstar } from './../model/DemandasBemEstar';
import { Curso } from './../model/Curso';
import { Turma } from './../model/Tuma';
import { User } from './../model/User';
import { FormBemEstarPos } from './../model/FormBemEstarPos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-form-bemestar-pos',
  templateUrl: './editar-form-bemestar-pos.component.html',
  styleUrls: ['./editar-form-bemestar-pos.component.css']
})
export class EditarFormBemestarPosComponent implements OnInit {

  form: FormBemEstarPos = new FormBemEstarPos()

  user: User = new User()
  listaUser: User[]
  idUser: number
  loading: number = 0;
  userAssistente: User = new User()
  idUserAssistente: number
  id:number=0
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
    private relatorioService: RelatoriosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.findAllUser()
    this.findAllTurma()
    this.findAllCurso()
    this.findAllProfile()
    this.findByIdProfile()
    this.findAllPrioridades()

    this.id = this.route.snapshot.params['id']
    if (this.id != 0) {
      this.loading = 1;
    }
    this.findFormById(this.id)

    this.form.solicitante = 'PARTICIPANTE'
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
    this.userService.getUserById(this.idUserAssistente).subscribe((resp: User)=>{
      this.userAssistente = resp
    })
  }

  findByIdUser(){
    this.userService.getUserById(this.idUser).subscribe((resp: User)=>{
      this.user = resp
     
    })
  }



  findAllTurma(){
    this.relatorioService.getAllTurma().subscribe((resp: Turma[])=>{
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

  tempo(ev){
    this.form.duracao = ev.target.value
  }

  profileEscolhido(ev){
    this.form.solicitante = "ROLE_" + ev.target.value
  }

  findFormById(id: number){
    this.bemestarService.getByIdFormPos(id).subscribe((resp: FormBemEstarPos)=>{
      this.form = resp
      this.loading = 2;
    })
  }

  finalizar(){
    this.userAssistente.id = this.idUserAssistente
    this.form.assistenteSocial = this.userAssistente

    // this.user.id = this.idUser
    // this.form.user = this.user

    // this.curso.id = this.idCurso
    // this.form.curso = this.curso
    
    // this.turma.id = this.idTurma
    // this.form.turma = this.turma

    this.form.demandas = this.demanda

    this.bemestarService.putFormPos(this.form).subscribe((resp: FormBemEstarPos)=>{
      this.form = resp
      this.alert.showAlertSuccess('Formulário editado com sucesso!')
      this.router.navigate(['/lista-form-bemestar-pos'])
    })
  }

}
