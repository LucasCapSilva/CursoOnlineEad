import { User } from './../model/User';
import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: User = new User();
  userId: number = environment.idUsuario;

  constructor(
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

  }

}
