import { AlertModelService } from './../../shared/alert-model.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UploadVideo } from './../../model/UploadVideo';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from './../../../environments/environment.prod';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  idVideo = environment.idVideoUpload
  selectedFile: File = null;
  uploadVideo: UploadVideo = new UploadVideo();
  carregando: boolean = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private locationPage: Location,
    private alertService: AlertModelService
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
  }

  onFileSelectd(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.carregando = true;
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post("http://31.220.57.121:9001/api/file/uploadFile/" + this.idVideo, fd).
      subscribe(res => {
        this.carregando = false;
        this.alertService.showAlertSuccess('Video cadastrado com sucesso!');
        this.router.navigate(['/home']);
      }, err => {
        this.alertService.showAlertDanger('Erro ao inserir o video!');
      });
  }
}
