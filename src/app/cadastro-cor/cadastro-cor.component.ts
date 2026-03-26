import { CronogramaCor } from './../model/CronogramaCor';
import { CronogramaService } from './../service/cronograma.service';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-cadastro-cor',
  templateUrl: './cadastro-cor.component.html',
  styleUrls: ['./cadastro-cor.component.css']
})
export class CadastroCorComponent implements OnInit {

  cor: CronogramaCor = new CronogramaCor();

  constructor(
    private alertService: AlertModelService,
    private router: Router,
    private cronogramaService: CronogramaService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertService.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }
  }

  cadastrar() {
    this.cronogramaService.postCor(this.cor).subscribe((resp: CronogramaCor) => {
      this.cor = resp;
      this.alertService.showAlertSuccess('Cor cadastrada com sucesso!');
    });
  }
}
