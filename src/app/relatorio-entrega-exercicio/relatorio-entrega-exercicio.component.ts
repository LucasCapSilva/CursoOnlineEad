import { User } from './../model/User';
import { EntregaExerciciosObr } from './../model/EntregaExerciciosObr';
import { PercentEntregas } from './../model/PercentEntregas';
import { EntregaExercicios } from './../model/EntragaExercicios';
import { Turma } from './../model/Tuma';
import { Router } from '@angular/router';
import { RelatoriosService } from './../service/relatorios.service';
import { AlertModelService } from './../shared/alert-model.service';
import { ExcelDownloadService } from './../service/excel-download.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-relatorio-entrega-exercicio',
  templateUrl: './relatorio-entrega-exercicio.component.html',
  styleUrls: ['./relatorio-entrega-exercicio.component.css']
})
export class RelatorioEntregaExercicioComponent implements OnInit {
  idTurma: number;
  turma: Turma = new Turma();
  listaTurma: Turma[] = [];
  entregasOb: EntregaExerciciosObr = new EntregaExerciciosObr();
  listaEntregasOb: EntregaExerciciosObr[] = [];
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

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN' && profile != 'ROLE_BEMESTAR') {
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
    this.excelService.exportAsExcelFile(this.listaEntregasOb, 'Lista de entregas por atividades');
  }

  findEntregas() {
    this.relatorioService.getByFilterEntregasObr(this.entregasOb.data, this.idTurma, this.entregasOb.nome).subscribe((resp: EntregaExerciciosObr[]) => {
      this.listaEntregasOb = resp;
      
      this.listagemOk = true;
      this.findAllTurma();
    }, err => {
      this.alertService.showAlertDanger('Digite ao menos uma informação para listar as entregas.');
    });
  }

}
