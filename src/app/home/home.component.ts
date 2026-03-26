import { AuthService } from './../service/auth.service';
import { RegistroSaidaService } from './../service/registro-saida.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private alertService: AlertModelService,
    public auth: AuthService
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
