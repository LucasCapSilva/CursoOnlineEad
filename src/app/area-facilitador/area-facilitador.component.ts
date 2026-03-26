import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-facilitador',
  templateUrl: './area-facilitador.component.html',
  styleUrls: ['./area-facilitador.component.css']
})
export class AreaFacilitadorComponent implements OnInit {

  constructor(
    private router: Router,
    private alertas: AlertModelService
  ) { }

  ngOnInit() {
    environment.titulo = 'Inicio'
    environment.icon = 'home'

    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertas.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    if(environment.idTurma == 8){
      this.alertas.showAlertInfo('Seu acesso não está mais disponível.')
      environment.token = ''
      this.router.navigate(['/login'])
    }

    const token = environment.token;

    if (token == '') {
      this.alertas.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
  }

  titulo(nome: string, icon: string){
    environment.titulo = nome
    environment.icon = icon
  }

}
