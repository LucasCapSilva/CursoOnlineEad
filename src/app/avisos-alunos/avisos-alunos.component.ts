import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { AvisosService } from './../service/avisos.service';
import { Avisos } from './../model/Avisos';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avisos-alunos',
  templateUrl: './avisos-alunos.component.html',
  styleUrls: ['./avisos-alunos.component.css']
})
export class AvisosAlunosComponent implements OnInit {

  idTurma = environment.idTurma;
  avisos: Avisos = new Avisos();
  listaAvisos: Avisos[];

  idUser = environment.idUsuario;
  key = 'data';
  reverse = true;
  page: 1 ;
  temaAviso: string;

  constructor(
    private avisosService: AvisosService,
    private router: Router,
    private alertService: AlertModelService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
    this.findAllAvisosByTurma();
  }
  scroll() {
    window.scroll(0, 0);
  }
  findAllAvisosByTurma() {
    this.avisosService.getAllAvisosByTurma(this.idTurma).subscribe((resp: Avisos[]) => {
      this.listaAvisos = resp;
      if (this.listaAvisos.length === 0) {
        this.router.navigate(['/home']);
        this.alertService.showAlertInfo('Não existem avisos para sua turma.');
      }
    });
  }

  pesquisar() {
    if (this.temaAviso === '') {
      this.findAllAvisosByTurma();
    } else {
      this.avisosService.getByTituloAviso(this.temaAviso, this.idTurma).subscribe((resp: Avisos[]) => {
        this.listaAvisos = resp;
      });
    }
  }
}
