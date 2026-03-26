import { BarometroDiarioService } from './../service/barometro-diario.service';
import { User } from './../model/User';
import { BarometroDiario } from './../model/BarometroDiario';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-barometro-diario',
  templateUrl: './barometro-diario.component.html',
  styleUrls: ['./barometro-diario.component.css']
})
export class BarometroDiarioComponent implements OnInit {
  barometro: string = '0';
  valorBarometro: string;
  modelBarometro: BarometroDiario = new BarometroDiario();
  user: User = new User();
  idUsuario = environment.idUsuario;
  envios: number = 2
  constructor(
    private alertService: AlertModelService,
    private router: Router,
    private barometroService: BarometroDiarioService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
  }

  pegarBarometro() {
     environment.valorBarometroDia = this.barometro

  }

  enviarBarometro() {
    this.valorBarometro = environment.valorBarometroDia;
    if (this.valorBarometro == undefined) {
      this.alertService.showAlertDanger('Antes de prosseguir, preencha o barometro corretamente!');
    } else {
      this.modelBarometro.score = Number(this.valorBarometro);
      this.user.id = this.idUsuario;
      this.modelBarometro.usuario = this.user;
      this.modelBarometro.data = new Date();
      this.barometroService.postBarometro(this.modelBarometro).subscribe((resp: BarometroDiario) => {
        this.modelBarometro = resp;

        if (this.modelBarometro == null) {
          environment.enviosBarometroDia = 0
          this.router.navigate(['/home']);
          this.alertService.showAlertDanger('Você já enviou o barometrô duas vezes hoje!');
          environment.valorBarometroDia = '';
          this.modelBarometro = new BarometroDiario();
        } else {
          environment.enviosBarometroDia = 1
          this.router.navigate(['/home']);
          this.alertService.showAlertSuccess('Barometro enviado com sucesso!');
          environment.valorBarometroDia = ''
          this.modelBarometro = new BarometroDiario();
        }

      }, err => {
        this.alertService.showAlertDanger('Você já enviou o barometrô duas vezes hoje!');
      });
    }
  }



}
