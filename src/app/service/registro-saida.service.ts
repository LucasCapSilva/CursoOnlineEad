import { ChamadaService } from './chamada.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class RegistroSaidaService {

  constructor(
    private router: Router,
    private alertService: AlertModelService,
    private chamadaService: ChamadaService
  ) { }

  mouseInativo() {
    let seg = 0;
    document.addEventListener('mousemove', () => {
      seg = 0;
    });
    setInterval(() => {
      seg = seg + 1;
      if (seg === 1200) {
        this.saidaChamada();
        environment.token = ''
        environment.nome = ''
        environment.profile = ''
        environment.idUsuario = 0
        environment.idTurma = 0
        this.router.navigate(['/login']);
        this.alertService.showAlertDanger('Sua sessão expirou, faça o login novamente');
      } else {
        return clearInterval;
      }
    }, 1000);
  }

  saidaChamada() {
    let idUser = environment.idUsuario;
    this.chamadaService.saidaChamada(idUser).subscribe((resp: any) => {
    });
  }

}
