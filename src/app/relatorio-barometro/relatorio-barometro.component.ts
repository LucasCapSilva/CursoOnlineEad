import { ExcelDownloadService } from './../service/excel-download.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { Turma } from './../model/Tuma';
import { BarometroFilter } from './../model/BarometroFilter';
import { HttpParams } from '@angular/common/http';
import { Barometro } from './../model/Barometro';
import { RelatoriosService } from './../service/relatorios.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-relatorio-barometro',
  templateUrl: './relatorio-barometro.component.html',
  styleUrls: ['./relatorio-barometro.component.css']
})
export class RelatorioBarometroComponent implements OnInit {

  idTurma: number;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  cor: string;

  listaBarometro: Barometro[];
  barometro: Barometro = new Barometro();
  numBarometro = 0;
  bFilter: BarometroFilter = new BarometroFilter();
  page = 1;

  listaBarometroExcel: any[] = [];

  constructor(
    private relatorioService: RelatoriosService,
    private router: Router,
    private excelService: ExcelDownloadService,
    private alertService: AlertModelService
    ) { }

  ngOnInit() {
    window.scroll(0, 0);

    // Barometro por aula
    this.findByFilter();
    this.findAllTurma();
    this.findAllBarometro();

    // Barometro diário

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
  }

  // Barometro por aula

  scroll() {
    window.scroll(0, 0);
  }

  findAllBarometro() {
    this.relatorioService.getAllBarometro().subscribe((resp: Barometro[]) => {
      this.listaBarometro = resp;
    });
  }

  findByFilter() {
    this.relatorioService.getByFilter(
      this.bFilter.nome,
      this.idTurma,
      this.bFilter.cor,
      this.bFilter.dataIn,
      this.bFilter.dataFim)
      .subscribe ((resp: Barometro[]) => {
      this.listaBarometro = resp;
    });
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
    this.listaBarometro.forEach((item) => {
      let barometro = {
        nome: item.usuario.nome,
        turma: item.usuario.turma.descricao,
        aula: item.aula.titulo,
        cor: item.cor,
        data: item.data,
      };
      this.listaBarometroExcel.push(barometro);
    });

    this.excelService.exportAsExcelFile(this.listaBarometroExcel, 'Lista do barometro diário');
  }
}
