import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { ExcelDownloadService } from './../service/excel-download.service';
import { Turma } from './../model/Tuma';
import { RelatoriosService } from './../service/relatorios.service';
import { Chamada } from './../model/Chamada';
import { ChamadaService } from './../service/chamada.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-chamada',
  templateUrl: './chamada.component.html',
  styleUrls: ['./chamada.component.css']
})
export class ChamadaComponent implements OnInit {
  idTurma: number;
  turma: Turma = new Turma();
  listaTurma: Turma[] = [];
  chamada: Chamada = new Chamada();
  listaChamada: Chamada[] = [];
  listagemOk = false;

  constructor(
    private chamadaService: ChamadaService,
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

  findChamada() {
    this.chamadaService.getChamada(this.idTurma, this.chamada.data).subscribe((resp: Chamada[]) => {
      this.listaChamada = resp;
      this.listagemOk = true;
      this.findAllTurma();
    }, err => {
      if (err.status === 400) {
        this.alertService.showAlertDanger('Preencha todos os campos para listar.');
      } else {
        this.alertService.showAlertInfo('Tente listar novamente.');
      }
    });
  }

  findByIdTurma() {
    this.relatorioService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.relatorioService.getAllTurma().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

  exportarExcel() {
    this.excelService.exportAsExcelFile(this.listaChamada, 'Lista de presença da turma: ' + this.turma.descricao);
  }

}
