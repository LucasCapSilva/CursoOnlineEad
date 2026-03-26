import { User } from './../model/User';
import { LinksUteis } from './../model/LinksUteis';
import { AlertModelService } from './../shared/alert-model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LinksUteisService } from './../service/links-uteis.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-editar-link-util',
  templateUrl: './editar-link-util.component.html',
  styleUrls: ['./editar-link-util.component.css']
})
export class EditarLinkUtilComponent implements OnInit {
  idLink: number;
  linksUteis: LinksUteis = new LinksUteis();
  user: User = new User();
  idUser = environment.idUsuario;
  constructor(
    private linksService: LinksUteisService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModelService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.idLink = this.route.snapshot.params['id'];
    this.findByIdLink(this.idLink);
  }

  findByIdLink(id: number) {
    this.linksService.getByIdLink(id).subscribe((resp: LinksUteis) => {
      this.linksUteis = resp;
    });
  }

  atualizar() {
    this.user.id = this.idUser;
    this.linksUteis.user = this.user;
    this.linksService.putLink(this.linksUteis).subscribe((resp: LinksUteis) => {
      this.linksUteis = resp;
      this.router.navigate(['/links-uteis']);
      this.alertService.showAlertSuccess('Link atualizado com sucesso!');
    });
  }

}
