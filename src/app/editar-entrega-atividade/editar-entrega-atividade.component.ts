import { AlertModelService } from './../shared/alert-model.service';
import { Entregas } from './../model/Entregas';
import { AtividadeService } from './../service/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-editar-entrega-atividade',
  templateUrl: './editar-entrega-atividade.component.html',
  styleUrls: ['./editar-entrega-atividade.component.css']
})
export class EditarEntregaAtividadeComponent implements OnInit {
  idEntrega: number;
  entregas: Entregas = new Entregas();
  constructor(
    private route: ActivatedRoute,
    private atividadeService: AtividadeService,
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
    this.atividadeService.getByIdEntrega(id).subscribe((resp: Entregas) => {
      this.entregas = resp;
    });
  }

  atualizar() {
    this.entregas.atividade.turma.curso = null;
    this.atividadeService.putEntrega(this.entregas).subscribe((resp: Entregas) => {
      this.entregas = resp;
      this.router.navigate(['/entregar-exercicio']);
      this.alertService.showAlertSuccess('Entrega atualizada com sucesso!');
    });
  }
}

