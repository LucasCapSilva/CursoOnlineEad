import { Curso } from './../../model/Curso';
import { AdmService } from './../../service/adm.service';
import { CursosService } from './../../service/cursos.service';
import { LiberarAulasService } from './../../service/liberar-aulas.service';
import { AlertModelService } from './../../shared/alert-model.service';
import { Router } from '@angular/router';
import { UploadComponent } from './../upload/upload.component';
import { Modulo } from './../../model/Modulo';

import { UploadVideo } from './../../model/UploadVideo';
import { UploadService } from './../upload.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
@Component({
  selector: 'app-cadastro-video',
  templateUrl: './cadastro-video.component.html',
  styleUrls: ['./cadastro-video.component.css']
})
export class CadastroVideoComponent implements OnInit {

  idModulo: number;
  listaModulos: Modulo[];
  idCurso: number;
  curso:Curso = new Curso;
  habilitarModulo:boolean = false;
  modulo: Modulo = new Modulo();
  listCurso = []
  showUp = false;
  uploadVideo: UploadVideo = new UploadVideo();

  constructor(
    private upload: UploadService,
    private router: Router,
    private alertService: AlertModelService,
    private aulaLiberadaService: LiberarAulasService,
    private admService: AdmService
    ) { }

  ngOnInit() {

    window.scroll(0, 0);

    const profile = environment.profile;

    if (profile != 'ROLE_ADMIN') {
      this.alertService.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
    this.findAllCurso();
    this.uploadVideo.descricao = 'Descrição padrão';
  }

  getIdModulos() {
    this.upload.getIdModulos(this.idModulo).subscribe((resp: Modulo) => {
      this.modulo = resp;
    });
  }

  findModuloByIdCurso() {
    this.aulaLiberadaService.getModuloByIdCurso(this.idCurso).subscribe((resp: Modulo[]) =>{
      this.listaModulos = resp;
      
    });
  }

  findAllCurso() {
    this.admService.getAllCurso().subscribe((resp: any) => {
      resp.map(item =>{
        this.listCurso.push({"id":item.id,"descricao":item.descricao})
      });
    });
  }

  findAllModulos() {
    this.upload.getAllModulos().subscribe((resp: Modulo[]) => {
      this.listaModulos = resp;
    });
  }

  findByIdCurso() {
    this.admService.getCursoById(this.idCurso).subscribe((resp: Curso) => {
      this.curso = resp;
      this.idCurso = this.curso.id;
      this.findModuloByIdCurso()
      this.habilitarModulo = true
    });
  }

  showUpload() {
    this.uploadVideo.modulo = this.modulo;
    this.upload.postCadastroVideo(this.uploadVideo).subscribe((resp: UploadVideo) => {
      this.uploadVideo = resp;
      environment.idVideoUpload = this.uploadVideo.id;
      this.showUp = true;
    });
  }
}
