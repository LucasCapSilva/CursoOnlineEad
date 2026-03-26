import { environment } from './../../environments/environment.prod';

import { AlertModelService } from './../shared/alert-model.service';
import { Chamada } from './../model/Chamada';
import { ChamadaService } from './../service/chamada.service';
import { User } from './../model/User';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserLogin: UserLogin = new UserLogin();
  user: User = new User();
  chamada: Chamada = new Chamada();

  constructor(
    private router: Router,
    private authService: AuthService,
    private chamadaService: ChamadaService,
    private alertService: AlertModelService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token != ''){
      this.router.navigate(['/home'])
      this.alertService.showAlertInfo('Você já está logado!')
    }

  }

  logarTrilhaZero() {
    environment.token = "------------"
    environment.nome = "user"
    environment.profile = "ROLE_ADMIN"
    environment.idUsuario = 1
    environment.turma = "turma00"
    environment.idTurma =  4
    environment.idCurso = 2
    environment.curso = "FullStack Java e React"
    environment.trilha = true
    this.entradaChamada();
    this.router.navigate(['/trilha-zero']);

  }

  logar() {

    this.authService.logar(this.UserLogin).subscribe((resp: any) => {
      this.UserLogin = resp;
      environment.token = this.UserLogin.token
      environment.nome = this.UserLogin.user.nome
      environment.profile = this.UserLogin.user.profile
      environment.idUsuario = this.UserLogin.user.id
      environment.turma = this.UserLogin.user.turma.descricao
      environment.idTurma = this.UserLogin.user.turma.id
      environment.idCurso = resp.user.turma.curso.id
      environment.curso = resp.user.turma.curso.descricao
      environment.trilha = false
      this.router.navigate(['/home']);

      if (environment.token !== '') {
        this.entradaChamada();
      } else {
        environment.token = ''
        environment.nome = ''
        environment.profile = ''
        environment.idUsuario = 0
        environment.idTurma = 0
        
        this.router.navigate(['/login']);
        this.alertService.showAlertDanger('Ouve um erro no login, tente novamente');
      }


    }, err => {
      this.alertService.showAlertDanger('E-mail ou senha inválidos, tente novamente!');
    });
  }

  entradaChamada() {
    let idUser = environment.idUsuario;
    this.chamadaService.entradaChamada(idUser).subscribe((resp: any) => {

    });
  }





}
