import { ExcelDownloadService } from './../service/excel-download.service';
import { PresencaZoom } from './../model/PresencaZoom';
import { Turma } from './../model/Tuma';
import { RelatorioZoomService } from './../service/relatorio-zoom.service';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-relatorio-zoom',
  templateUrl: './relatorio-zoom.component.html',
  styleUrls: ['./relatorio-zoom.component.css']
})
export class RelatorioZoomComponent implements OnInit {
  turma: Turma = new Turma();
  listaTurma: Turma[];
  idTurma: number;
  zoom: PresencaZoom = new PresencaZoom();
  listaZoom: PresencaZoom[];
  listagemOk = false;

  constructor(
    private alertService: AlertModelService,
    private router: Router,
    private excelService: ExcelDownloadService,
    private relatorioZoomService: RelatorioZoomService
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
    this.relatorioZoomService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.relatorioZoomService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

  findChamada() {
    this.relatorioZoomService.getChamadaByIdTurmaByData(this.idTurma, this.zoom.data).subscribe((resp: PresencaZoom[]) => {
      this.listaZoom = resp;
      this.listagemOk = true;
      this.findAllTurma();
    }, err => {
      this.alertService.showAlertDanger('Preencha todos os campos para listar.');
    });
  }

  exportarExcel() {
    this.excelService.exportAsExcelFile(this.listaZoom, 'Lista de presença da turma: ' + this.turma.descricao);
  }

}
