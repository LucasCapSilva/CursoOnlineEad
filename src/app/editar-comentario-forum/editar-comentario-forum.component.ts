import { ForumComentario } from './../model/ForumComentario';
import { ForumService } from './../service/forum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-editar-comentario-forum',
  templateUrl: './editar-comentario-forum.component.html',
  styleUrls: ['./editar-comentario-forum.component.css']
})
export class EditarComentarioForumComponent implements OnInit {

  forumComentario: ForumComentario = new ForumComentario();
  idComentario: number;
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
    this.idComentario = this.route.snapshot.params['id'];

    this.findByIdDuvida(this.idComentario);
  }

  atualizar() {
    this.duvidaForumService.putComentario(this.forumComentario).subscribe((resp: ForumComentario) => {
      this.forumComentario = resp;
      this.router.navigate(['/forum']);
      this.alertService.showAlertSuccess('Comentário atualizado com sucesso!');
    }, err => {
      this.alertService.showAlertDanger('Erro ao atualizar o comentário.');
    });
  }

  findByIdDuvida(id: number) {
    this.duvidaForumService.getByIdComentario(id).subscribe((resp: ForumComentario) => {
      this.forumComentario = resp;
    });
  }

}
