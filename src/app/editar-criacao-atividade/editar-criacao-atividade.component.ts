import { Turma } from './../model/Tuma';
import { RelatoriosService } from './../service/relatorios.service';
import { Atividade } from './../model/Atividade';
import { AtividadeService } from './../service/atividade.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-editar-criacao-atividade',
  templateUrl: './editar-criacao-atividade.component.html',
  styleUrls: ['./editar-criacao-atividade.component.css']
})
export class EditarCriacaoAtividadeComponent implements OnInit {
  idAtividade: number;
  atividade: Atividade = new Atividade();
  turma: Turma = new Turma();
  listaTurma: Turma[];
  idTurma: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModelService,
    private atividadeService: AtividadeService
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
    this.idAtividade = this.route.snapshot.params['id'];
    this.findByIdAtividade(this.idAtividade);
    this.findAllTurma();
  }

  findByIdAtividade(id: number) {
    this.atividadeService.getByIdAtividade(id).subscribe((resp: Atividade) => {
      this.atividade = resp;
    });
  }

  findByIdTurma() {
    this.atividadeService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.atividadeService.getAllTurma().subscribe((resp: Turma[]) => {
      this.listaTurma = resp;
    });
  }

  atualizar() {
    this.atividade.entrega = null;
    this.turma.id = this.idTurma;
    this.atividade.turma = this.turma;
    this.atividade.turma.curso = null;
    this.atividadeService.putAtividade(this.atividade).subscribe((resp: Atividade) => {
      this.atividade = resp;
      this.router.navigate(['/criar-exercicio']);
      this.alertService.showAlertSuccess('Atividade atualizada com sucesso!');
    }, err => {
      this.alertService.showAlertDanger('Verifique os campos e tente novamente');
    });
  }

}
