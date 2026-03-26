import { AtividadesObrigatoriasService } from './../service/atividades-obrigatorias.service';
import { environment } from './../../environments/environment.prod';
import { EntregasObrigatorias } from './../model/EntregasObrigatorias';
import { AlertModelService } from './../shared/alert-model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-entrega-atividade-obr',
  templateUrl: './editar-entrega-atividade-obr.component.html',
  styleUrls: ['./editar-entrega-atividade-obr.component.css']
})
export class EditarEntregaAtividadeObrComponent implements OnInit {

  idEntrega: number;
  entregas: EntregasObrigatorias = new EntregasObrigatorias();
  constructor(
    private route: ActivatedRoute,
    private atividadeObrService: AtividadesObrigatoriasService,
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
    this.idEntrega = this.route.snapshot.params['id'];
    this.findByIdEntrega(this.idEntrega);
  }

  findByIdEntrega(id: number) {
    this.atividadeObrService.getByIdEntrega(id).subscribe((resp: EntregasObrigatorias) => {
      this.entregas = resp;
    });
  }

  atualizar() {
    this.entregas.atividade.modulo = null;
    this.atividadeObrService.putEntrega(this.entregas).subscribe((resp: EntregasObrigatorias) => {
      this.entregas = resp;
      this.router.navigate(['/entregar-exercicio']);
      this.alertService.showAlertSuccess('Entrega atualizada com sucesso!');
    });


  }

}
