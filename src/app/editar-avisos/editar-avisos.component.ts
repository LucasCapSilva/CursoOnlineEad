import { Turma } from './../model/Tuma';
import { Avisos } from './../model/Avisos';
import { AlertModelService } from './../shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AvisosService } from './../service/avisos.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-editar-avisos',
  templateUrl: './editar-avisos.component.html',
  styleUrls: ['./editar-avisos.component.css']
})
export class EditarAvisosComponent implements OnInit {
  idTurma: number;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  idAviso: number;
  avisos: Avisos = new Avisos();
  constructor(
    private avisosService: AvisosService,
    private router: Router,
    private alertService: AlertModelService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {

    window.scroll(0, 0);

    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertService.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.idAviso = this.route.snapshot.params['id'];

    this.findByIdAviso(this.idAviso);
    this.findAllTurma();
  }

  findByIdAviso(id: number) {
    this.avisosService.getAvisosById(id).subscribe((resp: Avisos) => {
      this.avisos = resp;
    });
  }

  findByIdTurma() {
    this.avisosService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.avisosService.getAllTurma().subscribe((resp: Turma[]) => {
      this.listaTurma = resp;
    });
  }

  atualizar() {
    this.avisosService.puttAvisos(this.avisos).subscribe((resp: Avisos) => {
      this.avisos = resp;
      this.router.navigate(['/avisos-instrutor']);
      this.alertService.showAlertSuccess('Aviso atualizado com sucesso');
    }, err => {
      this.alertService.showAlertDanger('Não esqueça de preencher os campos obrigatórios!');
    });
  }
}
