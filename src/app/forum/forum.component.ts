import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from './../model/UserLogin';
import { User } from './../model/User';
import { AlertModelService } from './../shared/alert-model.service';
import { ForumService } from './../service/forum.service';
import { ForumComentario } from './../model/ForumComentario';
import { ForumDuvida } from './../model/ForumDuvida';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  duvida: ForumDuvida = new ForumDuvida();
  forumDuvida: ForumDuvida = new ForumDuvida();
  listaForumDuvida: ForumDuvida[];

  forumComentario: ForumComentario = new ForumComentario();
  listaForumComentario: ForumComentario[];
  userLogin: UserLogin = new UserLogin();
  user: User = new User();
  idUser = environment.idUsuario;
  key = 'data';
  reverse = true;
  delOk: boolean;
  temaDuvida: string;
  page = 1;
  foto
  constructor(
    private forumService: ForumService,
    private alertService: AlertModelService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    environment.titulo = 'Fórum'
    environment.icon = 'commenting'

    let token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
    this.findAllDuvidas();
    this.findAllComentarios();
  }

  titulos(nome: string, icone: string){
    environment.titulo = nome
    environment.icon = icone
  }

  scroll() {
    window.scroll(0, 0);
  }
  publicarDuvida() {
    this.user.id = this.idUser;
    this.forumDuvida.user = this.user;
    this.forumService.postDuvida(this.forumDuvida).subscribe((resp: ForumDuvida) => {
      this.forumDuvida = resp;
      this.findAllDuvidas();
      this.forumDuvida = new ForumDuvida();
      this.alertService.showAlertSuccess('Dúvida inserida com sucesso!');
    }, err => {
      this.alertService.showAlertDanger(`Erro ao inserir a dúvida: ${err.status}`);
    });
  }

  publicarComentario(id: number) {
    this.user.id = this.idUser;
    this.forumComentario.user = this.user;
    this.duvida.id = id;
    this.forumComentario.question = this.duvida;
    this.forumService.postComentario(this.forumComentario).subscribe((resp: ForumComentario) => {
      this.forumComentario = resp;
      this.alertService.showAlertSuccess('Comentário inserido com sucesso!');
      this.forumComentario = new ForumComentario();
      this.findAllDuvidas();
    }, err => {
      this.alertService.showAlertDanger(`Erro ao inserir o comentário: ${err.status}`);
    });
  }

  findAllDuvidas() {
    this.forumService.getAllDuvidas().subscribe((resp: ForumDuvida[]) => {
      this.listaForumDuvida = resp;
    });
  }

  findAllComentarios() {
    this.forumService.getAllComentarios().subscribe((resp: ForumComentario[]) => {
      this.listaForumComentario = resp;
    });
  }

  onDeleteDuvida(item) {

    const result$ = this.alertService.showConfirm('Confirmação', 'Deseja realmente apagar essa postagem?', 'Sim', 'Não');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.forumService.deleteDuvida(item.id) : EMPTY)
      ).subscribe(() => {
        this.delOk = true;
        this.deleteOk();
        this.findAllDuvidas();
      }, err => {
     
      });
  }

  onDeleteComentario(comment) {

    const result$ = this.alertService.showConfirm('Confirmação', 'Deseja realmente apagar essa postagem?', 'Sim', 'Não');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.forumService.deleteComentario(comment.id) : EMPTY)
      ).subscribe(() => {
        this.delOk = true;
        this.deleteOk();
        this.findAllDuvidas();
      }, err => {
       
      });
  }

  deleteOk() {
    this.alertService.showAlertSuccess('Post deletado com sucesso!');
}

pesquisar() {
  if (this.temaDuvida === '') {
    this.findAllDuvidas();
  } else {
    this.forumService.getByTituloDuvida(this.temaDuvida).subscribe((resp: ForumDuvida[]) => {
      this.listaForumDuvida = resp;
    });
  }
}

}
