import { Turma } from './../model/Tuma';
import { AlertModelService } from './../shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoomService } from './../service/zoom.service';
import { Zoom } from './../model/Zoom';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-editar-link-zoom',
  templateUrl: './editar-link-zoom.component.html',
  styleUrls: ['./editar-link-zoom.component.css']
})
export class EditarLinkZoomComponent implements OnInit {
  zoom: Zoom = new Zoom();
  idTurma: number;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  idLinkZoom: number;
  isFixo: number;
  constructor(
    private zoomService: ZoomService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModelService
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

    this.idLinkZoom = this.route.snapshot.params['id'];
    this.findByIdZoom(this.idLinkZoom);
    this.findAllTurma();
  }

  findByIdZoom(id: number) {
    this.zoomService.getByIdLink(id).subscribe((resp: Zoom) => {
      this.zoom = resp;
    });
  }

  valorFixo() {
    this.zoom.fixo = this.isFixo;
  }

  atualizar() {
    this.zoom.fixo = Number(this.isFixo);
    this.turma.id = this.idTurma;
    this.zoom.turma = this.turma;
    this.zoom.turma.curso = null;
    this.zoomService.puttLinkZoom(this.zoom).subscribe((resp: Zoom) => {
      this.zoom = resp;
      this.router.navigate(['/zoom-instrutor']);
      this.alertService.showAlertSuccess('Link atualizado com sucesso!');
    }, error => {
      if(error.status == '500') {
        this.alertService.showAlertDanger('Preencha todos os campos antes de atualizar.')
      }
    });
  }

  findByIdTurma() {
    this.zoomService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.zoomService.getAllTurma().subscribe((resp: Turma[]) => {
      this.listaTurma = resp;
    });
  }


}
