import { Router } from '@angular/router';
import { ZoomService } from './../service/zoom.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Zoom } from './../model/Zoom';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-zoom-aluno',
  templateUrl: './zoom-aluno.component.html',
  styleUrls: ['./zoom-aluno.component.css']
})
export class ZoomAlunoComponent implements OnInit {
  zoom: Zoom = new Zoom();
  listaLinkFixo: Zoom[];
  listaLinksDinamicos: Zoom[];
  key: 'data';
  reverse: true;
  page = 1;
  idTurma = environment.idTurma
  idUser = environment.idUsuario


  constructor(
    private alertService: AlertModelService,
    private router: Router,
    private zoomService: ZoomService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    const token = environment.token

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.listarLinks();
  }

  findAllLinkByTurmaFixo() {
    this.zoomService.getAllLinkByTurma(this.idTurma, 1).subscribe((resp: Zoom[]) => {
      this.listaLinkFixo = resp;
      if (this.listaLinkFixo == null && this.listaLinkFixo.length == 0) {
        this.router.navigate(['/home']);
        this.alertService.showAlertInfo('Não existem links do zoom para sua turma.');
      }
    });
  }

  findAllLinkByTurmaDinamico() {
    this.zoomService.getAllLinkByTurma(this.idTurma, 0).subscribe((resp: Zoom[]) => {
      this.listaLinksDinamicos = resp;
    });
  }

  listarLinks() {
    this.findAllLinkByTurmaFixo();
    this.findAllLinkByTurmaDinamico();
  }

  //TODO-Parei aqui
  getClick() {
    this.zoomService.getClickLinkZoom(this.idUser).subscribe(() => {
    });
  }

}
