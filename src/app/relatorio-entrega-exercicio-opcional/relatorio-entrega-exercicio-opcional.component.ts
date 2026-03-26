import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { RelatoriosService } from './../service/relatorios.service';
import { AlertModelService } from './../shared/alert-model.service';
import { ExcelDownloadService } from './../service/excel-download.service';
import { User } from './../model/User';
import { EntregaExercicios } from './../model/EntragaExercicios';
import { Turma } from './../model/Tuma';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-entrega-exercicio-opcional',
  templateUrl: './relatorio-entrega-exercicio-opcional.component.html',
  styleUrls: ['./relatorio-entrega-exercicio-opcional.component.css']
})
export class RelatorioEntregaExercicioOpcionalComponent implements OnInit {

  idTurma: number;
  turma: Turma = new Turma();
  listaTurma: Turma[] = [];
  entregas: EntregaExercicios = new EntregaExercicios();
  listaEntregas: EntregaExercicios[] = [];
  listagemOk = false;
  user: User = new User()

  constructor(
    private excelService: ExcelDownloadService,
    private alertService: AlertModelService,
    private relatorioService: RelatoriosService,
    private router: Router
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

    this.findAllTurma();
  }

  findByIdTurma() {
    this.relatorioService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.relatorioService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

  exportarExcel() {
    this.excelService.exportAsExcelFile(this.listaEntregas, 'Lista de entregas por atividades');
  }

  findEntregas() {
    this.relatorioService.getByFilterEntregas(this.entregas.data, this.idTurma, this.entregas.nome).subscribe((resp: EntregaExercicios[]) => {
      this.listaEntregas = resp;
      this.listagemOk = true;
      this.findAllTurma();
    }, err => {
      this.alertService.showAlertDanger('Digite ao menos uma informação para listar as entregas.');
    });
  }

}
