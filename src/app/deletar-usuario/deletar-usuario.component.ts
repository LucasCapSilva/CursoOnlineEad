import { take, switchMap } from 'rxjs/operators';
import { AdmService } from './../service/adm.service';
import { AlertModelService } from './../shared/alert-model.service';
import { ZoomService } from './../service/zoom.service';
import { Turma } from './../model/Tuma';
import { Router } from '@angular/router';
import { TurmaService } from './../service/turma.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-deletar-usuario',
  templateUrl: './deletar-usuario.component.html',
  styleUrls: ['./deletar-usuario.component.css']
})
export class DeletarUsuarioComponent implements OnInit {

  turma: Turma = new Turma()
  listaTurma: Turma[]
  idTurma: number
  listaOk = false

  constructor(
    private admService: AdmService,
    private turmaService: ZoomService,
    private router: Router,
    private alertaService: AlertModelService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.findAllTurma()
  }

  findByIdTurma(){
    this.turmaService.getByIdTurma(this.idTurma).subscribe((resp: Turma)=>{
      this.turma = resp
      this.listaOk = true
    })
  }

  findAllTurma(){
    this.listaTurma = []
    this.turmaService.getAllTurma().subscribe((resp: Turma[])=>{
      if(this.auth.programas()){
        resp.forEach(turmas =>{
          if(turmas.descricao != 'Instrutor' && turmas.descricao != 'Admin' && turmas.descricao != 'Turma Staff' && turmas.descricao != 'Ex-Participantes' && turmas.descricao != 'Programas' ){
            this.listaTurma.push(turmas)
          }
        })
      } else {
        this.listaTurma = resp
      }


    })
  }


  onDeleteUser(item) {

    const result$ = this.alertaService.showConfirm('Confirmação', 'Deseja realmente remover esse usuário?', 'Sim', 'Não');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.admService.userInactive(item.id) : EMPTY)
      ).subscribe(() => {
        this.alertaService.showAlertSuccess('Usuário removido com sucesso!')
        this.idTurma = 0
        this.listaOk = false
      }, err => {
        
      });
  }

}
