import { AuthService } from './../service/auth.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  selectedFile: File = null;
  user: User = new User();
  userId: number = Number(localStorage.getItem('idUsuario'));


  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };
  constructor(
    private router: Router,
    private alertService: AlertModelService,
    private http: HttpClient,
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
    //this.findUserById();
    //this.findByIdUserSemFoto();
  }
/*
findUserById() {
    this.perfilService.getByIdUser(this.userId).subscribe((resp: UserFoto) => {
      this.userFoto = resp;
    }, err => {
      if (err.status === 404) {
        this.findByIdUserSemFoto();
      }
    });
  }

  findByIdUserSemFoto() {
    this.perfilService.getByIdUserSemFoto(this.userId).subscribe((resp: User) => {
      this.user = resp;
    });
  }



  onFileSelectd(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    // Atualizar Foto
    const foto = new FormData;
    foto.append('foto', this.selectedFile, this.selectedFile.name)
    this.http.put(`http://31.220.57.121:9000/userUpdate/put/photo/${this.userId}`, foto, this.token).
      subscribe(res => {

      }, err => {
        if (err.status === 500) {
          this.alertService.showAlertDanger('Sua foto é muito grande, escolha uma menor...');
        } else {
          localStorage.setItem('foto', this.userFoto.foto);
          setTimeout(() => {
            this.router.navigate(['/perfil']);
          }, 1500);
        }
      });

      // Atualizar o nome
  }

  atualizarNome() {
    this.perfilService.putUser(this.userId, this.user.nome).subscribe((resp: User) => {
      this.user = resp;
      localStorage.setItem('nome', this.user.nome);
      this.alertService.showAlertSuccess('Perfil atualizado com sucesso!');
      setTimeout(() => {
        this.router.navigate(['/perfil']);
      }, 1500);
    }, err => {
      if (err.status === 500) {
        this.alertService.showAlertDanger('Seu nome precisa ter no minimo 5 caracteres...')
      }
    });
  }


*/
}
