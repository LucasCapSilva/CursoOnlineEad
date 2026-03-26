import { TurmaService } from './service/turma.service';
import { AuthService } from './service/auth.service';
import { AlertModelService } from './shared/alert-model.service';
import { RelatoriosService } from './service/relatorios.service';
import { RegistroSaidaService } from './service/registro-saida.service';
import { Chamada } from './model/Chamada';
import { ChamadaService } from './service/chamada.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment.prod';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: string
  idUser = environment.idUsuario
  chamada: Chamada = new Chamada();

  constructor(
    private router: Router,
    private saidaService: RegistroSaidaService,
    public authService: AuthService,
    private alertService: AlertModelService,
    private turmaService: TurmaService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.onReload();
    this.saidaService.mouseInativo();
    this.findAllTurma();
    this.token = environment.token;

  }

  findAllTurma() {
    this.turmaService.getAllTurma().subscribe((resp: any) => {

    }, err => {
      if (err.status === 401) {
        this.saidaService.saidaChamada();
        environment.nome = ''
        environment.profile = ''
        environment.idUsuario = 0
        environment.idTurma = 0
        environment.token = ''
        environment.valorBarometroDia = ''
        environment.valorBarometroVideo = ''
        environment.temaModulo = ''
        environment.corModulo = ''
        environment.idModulo = 0
        environment.idEventoCronograma = 0
        environment.idVideoUpload = 0
        this.alertService.showAlertInfo('Seu token expirou, faça o login novamente!');
        this.router.navigate(['/login']);
      }
    });
  }


  onReload() {
    window.addEventListener('beforeunload', () => {
      this.saidaService.saidaChamada();
      environment.nome = ''
      environment.profile = ''
      environment.idUsuario = 0
      environment.idTurma = 0
      environment.token = ''
      environment.valorBarometroDia = ''
      environment.valorBarometroVideo = ''
      environment.temaModulo = ''
      environment.corModulo = ''
      environment.idModulo = 0
      environment.idEventoCronograma = 0
      environment.idVideoUpload = 0
    });

    window.addEventListener('unload', () => {
      this.saidaService.saidaChamada();
      environment.nome = ''
      environment.profile = ''
      environment.idUsuario = 0
      environment.idTurma = 0
      environment.token = ''
      environment.valorBarometroDia = ''
      environment.valorBarometroVideo = ''
      environment.temaModulo = ''
      environment.corModulo = ''
      environment.idModulo = 0
      environment.idEventoCronograma = 0
      environment.idVideoUpload = 0
    });
  }
}
