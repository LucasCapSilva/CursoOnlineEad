import { FormBemEstarSolicita } from './../model/FormBemEstarSolicita';
import { BemestarService } from './../service/bemestar.service';
import { environment } from './../../environments/environment.prod';
import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-bemestar',
  templateUrl: './area-bemestar.component.html',
  styleUrls: ['./area-bemestar.component.css']
})
export class AreaBemestarComponent implements OnInit {

  listaFormsSolicita: FormBemEstarSolicita[]
  pendentes: number = 0

  constructor(
    private router: Router,
    private alertas: AlertModelService,
    private bemestarService: BemestarService
  ) { }

  ngOnInit() {
    environment.titulo = 'Inicio'
    environment.icon = 'home'





    const profile = environment.profile;

    if (profile != 'ROLE_BEMESTAR') {
      this.alertas.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    if (environment.idTurma == 8) {
      this.alertas.showAlertInfo('Seu acesso não está mais disponível.')
      environment.token = ''
      this.router.navigate(['/login'])
    }

    const token = environment.token;

    if (token == '') {
      this.alertas.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.findAllFormsPos()
  }

  titulo(nome: string, icon: string) {
    environment.titulo = nome
    environment.icon = icon
  }

  findAllFormsPos() {
    this.bemestarService.getAllFormsSolicita().subscribe((resp: FormBemEstarSolicita[]) => {
      resp.forEach((i) => {
        if (i.atendido == null) {
          this.pendentes = this.pendentes + 1
        }
      })

    })
  }

}
