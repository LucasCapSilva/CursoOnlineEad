import { AlertModelService } from './../../shared/alert-model.service';
import { environment } from 'src/environments/environment.prod';
import { CurriculoPortifolioService } from './../../service/curriculo-portifolio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curriculo } from 'src/app/model/Curriculo';
import { CurriculoPortifolio } from 'src/app/model/CurriculoPortifolio';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-criar-curriculo-portifolio',
  templateUrl: './criar-curriculo-portifolio.component.html',
  styleUrls: ['./criar-curriculo-portifolio.component.css']
})
export class CriarCurriculoPortifolioComponent implements OnInit {
  id: number;
  tipo: string;
  idUser: number;
  numeroPi = "";
  descricao = "";
  nomeProjeto = "";
  link = "";
  editarCadastrar = "";
  listCurriculoPortifolio = [];
  curriculo = new Curriculo();


  curriculoPortifolio: CurriculoPortifolio = new CurriculoPortifolio("", "", "", "", this.curriculo);
  constructor(private router: Router,
    private route: ActivatedRoute,
    private curriculoPortifolioService: CurriculoPortifolioService,
    private curriculoService: CurriculoService,
    private alertService: AlertModelService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tipo = this.route.snapshot.params['tipo'];
    this.idUser = this.route.snapshot.params['idUser'];
    this.curriculo.id = this.id
    if (this.tipo != "editar") {
      this.editarCadastrar = "Avançar"
      environment.titulo = "Criar - Curriculo portifolio"
    } else {
      this.editarCadastrar = "Editar"
      environment.titulo = "Editar - Curriculo portifolio"
      this.findCurriculoPortifolio(this.idUser);
    }


  }

  onInsert() {
    if (this.curriculoPortifolio.nomeProjeto != "" && this.listCurriculoPortifolio.length <= 1)
      if (this.curriculoPortifolio.nomeProjeto != "") {
        if (this.curriculoPortifolio.link != "") {
          if (this.curriculoPortifolio.descricao != "") {
            if (this.curriculoPortifolio.numeroPi != "") {
             
              this.listCurriculoPortifolio.push(new CurriculoPortifolio(this.curriculoPortifolio.nomeProjeto, 
                this.curriculoPortifolio.link, this.curriculoPortifolio.descricao, this.curriculoPortifolio.numeroPi, this.curriculo))
              this.curriculoPortifolio = new CurriculoPortifolio("", "", "", "", this.curriculo);
            }
          }
        }

      }
  }
  selectNumeroPi(event: any){
    this.curriculoPortifolio.numeroPi = event.target.value
    this.numeroPi = event.target.value
  }

  onDelete(n) {
    this.curriculoPortifolioService.deleteCurriculoPortifolio(this.listCurriculoPortifolio[n].id).subscribe(() => {
    })
    this.listCurriculoPortifolio.splice(n, 1);
    this.alertService.showAlertInfo('curriculo deletado')
    this.findCurriculoPortifolio(this.idUser);
  }

  findCurriculoPortifolio(idUser: number) {
    this.curriculoService.getByUserCurriculo(idUser).subscribe((resp: any) => {
      this.listCurriculoPortifolio = resp.portifolios;
    })
  }


  saveEndNextStap() {
    if (this.tipo != "editar") {
      this.curriculoPortifolioService.postAllCurriculoPortifolio(this.listCurriculoPortifolio).subscribe((resp: CurriculoPortifolio[]) => {
        this.listCurriculoPortifolio = null;
        this.listCurriculoPortifolio = resp;
        this.alertService.showAlertInfo('curriculo criado')
        this.router.navigate(["criar-curriculo-extra/", this.id])
      })
    } else {
      //TODO aqui era pra ser putAll
      this.listCurriculoPortifolio.map(portifolio => {
        portifolio.curriculo = this.curriculo;
        portifolio.curriculo.id = this.id;
      })
      this.curriculoPortifolioService.putAllCurriculoPortifolio(this.listCurriculoPortifolio).subscribe((resp: CurriculoPortifolio[]) => {
        this.listCurriculoPortifolio = null;
        this.listCurriculoPortifolio = resp;
        this.findCurriculoPortifolio(this.idUser);
        this.alertService.showAlertInfo('curriculo editado')
        this.router.navigate(["criar-curriculo-extra/", "editar", this.id, this.idUser])
        // this.router.navigate(["criar-curriculo-profissional/", this.id])
      })


    }
  }
}