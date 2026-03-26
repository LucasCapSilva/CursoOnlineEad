import { ExcelDownloadService } from './../service/excel-download.service';
import { RelatorioBarometroDiaService } from './../service/relatorio-barometro-dia.service';
import { BarometroFilter } from './../model/BarometroFilter';
import { Turma } from './../model/Tuma';
import { BarometroDiario } from './../model/BarometroDiario';
import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-relatorio-barometro-dia',
  templateUrl: './relatorio-barometro-dia.component.html',
  styleUrls: ['./relatorio-barometro-dia.component.css']
})
export class RelatorioBarometroDiaComponent implements OnInit {
  date = 'date'
  reverse = true

  idTurma: number;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  cor: string;
  pageD = 1;
  listaBarometroDiaExcel: any[] = [];
  bFilter: BarometroFilter = new BarometroFilter();

  listaBarometroDia: BarometroDiario[];
  barometroDia: BarometroDiario = new BarometroDiario();
  constructor(
    private relatorioDiaService: RelatorioBarometroDiaService,
    private excelService: ExcelDownloadService,
    private router: Router,
    private alertService: AlertModelService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.findAllBarometroDiario()

    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertService.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    const token = environment.token;
    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!')
      this.router.navigate(['/login']);
    }
    this.findAllTurma();
    this.findByFilterDia();
  }

  scroll() {
    window.scroll(0, 0);
  }

  findAllBarometroDiario() {
    document.getElementById('carregando').innerHTML = 'Carregando Relatório...'
    this.relatorioDiaService.getAllBarometroDiario().subscribe((resp: BarometroDiario[]) => {
      this.listaBarometroDia = resp;
      document.getElementById('carregando').innerHTML = ''
    });
  }

  findByFilterDia() {
    this.relatorioDiaService.getByFilterDiario(
      this.bFilter.nome,
      this.idTurma,
      this.bFilter.cor,
      this.bFilter.dataIn,
      this.bFilter.dataFim)
      .subscribe ((resp: BarometroDiario[]) => {
      this.listaBarometroDia = resp;
    });
  }

  findByIdTurma() {
    this.relatorioDiaService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.relatorioDiaService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

  exportarExcel() {
    this.listaBarometroDia.forEach((item) => {
      let barometro = {
        nome: item.usuario.nome,
        turma: item.usuario.turma.descricao,
        cor: item.cor,
        data: item.data,
      };
      this.listaBarometroDiaExcel.push(barometro);
    });

    this.excelService.exportAsExcelFile(this.listaBarometroDiaExcel, 'Lista do barometro diário');
  }

}
