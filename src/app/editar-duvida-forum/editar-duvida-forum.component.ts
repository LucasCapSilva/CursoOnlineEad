import { AlertModelService } from './../shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from './../service/forum.service';
import { ForumDuvida } from './../model/ForumDuvida';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-editar-duvida-forum',
  templateUrl: './editar-duvida-forum.component.html',
  styleUrls: ['./editar-duvida-forum.component.css']
})
export class EditarDuvidaForumComponent implements OnInit {
  forumDuvida: ForumDuvida = new ForumDuvida();
  idDuvida: number;
  constructor(
    private duvidaForumService: ForumService,
    private router: Router,
    private alertService: AlertModelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.idDuvida = this.route.snapshot.params['id'];

    this.findByIdDuvida(this.idDuvida);
  }

  atualizar() {
    this.forumDuvida.comment = null;
    this.duvidaForumService.putDuvida(this.forumDuvida).subscribe((resp: ForumDuvida) => {
      this.forumDuvida = resp;
      this.router.navigate(['/forum']);
      this.alertService.showAlertSuccess('Post atualizado com sucesso!');
    }, err => {
      this.alertService.showAlertDanger(`Erro ao atualizar o post: ${err.status}`);
    });
  }

  findByIdDuvida(id: number) {
    this.duvidaForumService.getByIdDuvida(id).subscribe((resp: ForumDuvida) => {
      this.forumDuvida = resp;
    });
  }

}
