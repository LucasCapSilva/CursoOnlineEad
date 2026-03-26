import { UserLogin } from './../model/UserLogin';
import { User } from './../model/User';
import { RegistroSaidaService } from './../service/registro-saida.service';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { LinksUteis } from './../model/LinksUteis';
import { LinksUteisService } from './../service/links-uteis.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-links-uteis',
  templateUrl: './links-uteis.component.html',
  styleUrls: ['./links-uteis.component.css']
})
export class LinksUteisComponent implements OnInit {

  link: LinksUteis = new LinksUteis();
  listaLinksFixos: LinksUteis[];
  listaLinksDinamicos: LinksUteis[];
  nomeUsuario = environment.nome;
  idUser = environment.idUsuario;
  role = environment.profile;
  key = 'data';
  reverse = true;
  user: User = new User();
  page = 1;
  pageInstrutor = 1
  constructor(
    private linkService: LinksUteisService,
    private alertService: AlertModelService,
    private router: Router
    ) { }

  ngOnInit() {
    window.scroll(0, 0);
    environment.titulo = 'Links Úteis'
    environment.icon = 'link'
    const token = environment.token;
    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
    this.listarLinks();
  }

  findByLink() {
    this.linkService.getByLink(this.link.link).subscribe((resp: LinksUteis) => {
      this.link = resp;
      this.alertService.showAlertDanger('Esse link já foi inserido na lista, por: ' + this.link.user.nome);
    }, err => {
      if (err.status === 400) {
        this.inserirLink();
      }
    });
  }

  titulos(nome: string, icone: string){
    environment.titulo = nome
    environment.icon = icone
  }

  inserirLink() {
    if (this.role === 'ROLE_PARTICIPANTE') {
      this.link.fixo = 0;
    } else {
      this.link.fixo = 1;
    }
    this.user.id = this.idUser;
    this.link.user = this.user;
    this.linkService.postLinks(this.link).subscribe((resp: LinksUteis) => {
      this.link.data = new Date();
      this.link = resp;
      this.listarLinks();
      this.alertService.showAlertSuccess('Link inserido com sucesso!')
      this.link = new LinksUteis();
    }, err => {
      if( err.status == 500){
        this.alertService.showAlertDanger('Preencha os campos corretamente antes de enviar!')
      }

    });
  }

  listarLinksFixos() {
    this.linkService.getLinks(1).subscribe((resp: LinksUteis[]) => {
      this.listaLinksFixos = resp;
    });
  }

  listarLinksDinamicos() {
    this.linkService.getLinks(0).subscribe((resp: LinksUteis[]) => {
      this.listaLinksDinamicos = resp;
    });
  }

  listarLinks() {
    this.listarLinksFixos();
    this.listarLinksDinamicos();
  }

}
