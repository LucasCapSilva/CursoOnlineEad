import { User } from './../model/User';
import { Avisos } from './../model/Avisos';
import { Turma } from './../model/Tuma';
import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { AvisosService } from './../service/avisos.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-avisos-instrutor',
  templateUrl: './avisos-instrutor.component.html',
  styleUrls: ['./avisos-instrutor.component.css']
})
export class AvisosInstrutorComponent implements OnInit {

  idTurma: number;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  idTurmaListar: number;
  avisos: Avisos = new Avisos();
  listaAvisos: Avisos[];
  delOk = false;
  user: User = new User();
  idUser = environment.idUsuario;
  key = 'data';
  reverse = true;

  constructor(
    private avisosService: AvisosService,
    private router: Router,
    private alertService: AlertModelService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    environment.titulo = 'Avisos'
    environment.icon = 'bullhorn'

    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertService.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }
    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
    this.findAllTurma();
  }

  titulo(nome: string, icon: string){
    environment.titulo = nome
    environment.icon = icon
  }

  findByIdTurma() {
    this.avisosService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.avisosService.getAllTurma().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

  publicar() {
    this.turma.id = this.idTurma;
    this.avisos.turma = this.turma;
    this.user.id = this.idUser;
    this.avisos.user = this.user;
    this.avisosService.postAvisos(this.avisos).subscribe((resp: Avisos) => {
      this.avisos = resp;
      this.findAllAvisosByTurma();
      this.alertService.showAlertSuccess('Aviso postado com sucesso!');
      this.avisos = new Avisos();
    });
  }

  findAllAvisosByTurma() {
    this.avisosService.getAllAvisosByTurma(this.idTurmaListar).subscribe((resp: Avisos[]) => {
      this.listaAvisos = resp;
    });
  }

  onDeleteAviso(item) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Deseja realmente apagar esse aviso?', 'Sim', 'Não');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.avisosService.deleteAvisos(item.id) : EMPTY)
      ).subscribe(() => {
        this.delOk = true;
        this.deleteOk();
        this.findAllAvisosByTurma();
      }, err => {
      });
  }

  deleteOk() {
    this.alertService.showAlertSuccess('Aviso apagado com sucesso!');
}

}
