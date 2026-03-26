import { Modulo } from './../model/Modulo';
import { environment } from 'src/environments/environment.prod';
import { AlertModelService } from './../shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AtividadeObrigatoria } from './../model/AtividadeObrigatoria';
import { Component, OnInit } from '@angular/core';
import { AtividadesObrigatoriasService } from '../service/atividades-obrigatorias.service';

@Component({
  selector: 'app-editar-atividade-obrigatoria',
  templateUrl: './editar-atividade-obrigatoria.component.html',
  styleUrls: ['./editar-atividade-obrigatoria.component.css']
})
export class EditarAtividadeObrigatoriaComponent implements OnInit {

  idAtividade: number;
  atividade: AtividadeObrigatoria = new AtividadeObrigatoria();
  idModulo: number;

  modulo: Modulo = new Modulo()
  listaModulos: Modulo[]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModelService,
    private atividadeService: AtividadesObrigatoriasService
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
    this.idAtividade = this.route.snapshot.params['id'];
    this.findByIdAtividade(this.idAtividade);
    this.findAllModulo();
  }

  findByIdAtividade(id: number) {
    this.atividadeService.getAtividadeById(id).subscribe((resp: AtividadeObrigatoria) => {
      this.atividade = resp;
    });
  }

  findAllModulo(){
    this.atividadeService.getAllModulos().subscribe((resp: Modulo[])=>{
      this.listaModulos = resp
    })
  }

  findByIdModulo(){
    this.atividadeService.getByIdModulo(this.idModulo).subscribe((resp: Modulo)=>{
      this.modulo = resp
    })
  }


  atualizar() {
    this.atividade.entrega = null;
    this.modulo.id = this.idModulo;
    this.atividade.modulo = this.modulo;
    this.atividadeService.putAtividade(this.atividade).subscribe((resp: AtividadeObrigatoria) => {
      this.atividade = resp;
      this.router.navigate(['/home']);
      this.alertService.showAlertSuccess('Atividade atualizada com sucesso!');
    }, err => {
      this.alertService.showAlertDanger('Verifique os campos e tente novamente');
    });
  }


}
