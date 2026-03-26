import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { ZoomService } from './../service/zoom.service';
import { Turma } from './../model/Tuma';
import { Zoom } from './../model/Zoom';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-zoom-instrutor',
  templateUrl: './zoom-instrutor.component.html',
  styleUrls: ['./zoom-instrutor.component.css']
})
export class ZoomInstrutorComponent implements OnInit {
  zoom: Zoom = new Zoom();
  listaLinkFixo: Zoom[];
  listaLinksDinamicos: Zoom[];
  key: 'data';
  reverse: true;
  page = 1;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  idTurma: number;
  isFixo: number;
  idTurmaLista: number;
  delOk: boolean;
  temFixo = false;
  selecionado = false;
  constructor(
    private zoomService: ZoomService,
    private alertService: AlertModelService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertService.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    const token = environment.token

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.findAllTurma();


  }

  titulos(nome: string, icone: string){
    environment.titulo = nome
    environment.icon = icone
  }

  findAllLinkByTurmaFixo() {
    this.zoomService.getAllLinkByTurma(this.idTurmaLista, 1).subscribe((resp: Zoom[]) => {
      this.listaLinkFixo = resp;
    });
  }

  findAllLinkByTurmaDinamico() {
    this.zoomService.getAllLinkByTurma(this.idTurmaLista, 0).subscribe((resp: Zoom[]) => {
      this.listaLinksDinamicos = resp;
    });
  }

  listarLinks() {
    this.selecionado = true
    this.findAllLinkByTurmaFixo();
    this.findAllLinkByTurmaDinamico();
  }

  valorFixo() {
    this.zoom.fixo = this.isFixo;
  }

  postLinkZoom() {
    this.zoom.fixo = Number(this.isFixo);
    this.zoom.turma = new Turma()
    this.zoom.turma.id = this.idTurma;
    this.zoomService.postLinkZoom(this.zoom).subscribe((resp: Zoom) => {
      this.zoom = resp;
      this.alertService.showAlertSuccess('Link cadastrado com sucesso');
      this.listarLinks();
      this.zoom = new Zoom();
    });
  }

  deletarLink(item) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Deseja realmente apagar esse link?', 'Sim', 'Não');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.zoomService.deleteLinkZoom(item.id) : EMPTY)
      ).subscribe(() => {
        this.delOk = true;
        this.deleteOk();
        this.listarLinks();
      }, err => {
        
      });
  }

  deleteOk() {
    this.alertService.showAlertSuccess('Exercício apagado com sucesso!');
}

  findAllLinksFixos() {
    this.zoomService.getAllLinksZoom().subscribe((resp: Zoom[]) => {
      this.listaLinkFixo = resp;
    });
  }

  findByIdTurma() {
    this.zoomService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.zoomService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

}
