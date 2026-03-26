import { AuthService } from './../service/auth.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CronogramaService } from './../service/cronograma.service';
import { RelatoriosService } from './../service/relatorios.service';
import { Cronograma } from './../model/Cronograma';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-deletar-cronograma',
  templateUrl: './deletar-cronograma.component.html',
  styleUrls: ['./deletar-cronograma.component.css']
})
export class DeletarCronogramaComponent implements OnInit {
  cronograma: Cronograma = new Cronograma();
  constructor(
    private relatorioService: RelatoriosService,
    public cronogramaService: CronogramaService,
    private router: Router,
    private alertService: AlertModelService,
    private auth: AuthService,
    private route: ActivatedRoute
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

    let idEvento = this.route.snapshot.params["id"];
    this.findByIdEvento(idEvento);
  }

  findByIdEvento(id: number) {
    this.cronogramaService.getByIdAgenda(id).subscribe((resp: Cronograma) => {
      this.cronograma = resp;
    });
  }

  btnSim() {
    this.cronogramaService.deleteAgenda(this.cronograma.id).subscribe(() => {
      this.router.navigate(['/cronograma-instrutor']);
      this.alertService.showAlertSuccess('Sessão apagada com sucesso');
    });
  }

  btnNao() {
    this.router.navigate(['/cronograma-instrutor']);
  }

}
