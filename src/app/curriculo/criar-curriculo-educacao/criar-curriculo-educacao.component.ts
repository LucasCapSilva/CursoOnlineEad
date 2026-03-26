import { AlertModelService } from './../../shared/alert-model.service';
import { CurriculoEducacaoService } from './../../service/curriculo-educacao.service';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { CurriculoEducacao } from 'src/app/model/CurriculoEducacao';
import { ActivatedRoute, Router } from '@angular/router';
import { Curriculo } from 'src/app/model/Curriculo';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-criar-curriculo-educacao',
  templateUrl: './criar-curriculo-educacao.component.html',
  styleUrls: ['./criar-curriculo-educacao.component.css']
})
export class CriarCurriculoEducacaoComponent implements OnInit {
  id: number;
  tipo: string;
  idUser:number;
  editarCadastrar = ""
  nomeEscolaSelect = ""
  cursoSelect = ""
  mesAnoInSelect = ""
  mesAnoFimSelect = ""
  estadoCurso = ""
  listCurriculoEducacao = [
  ];
  curriculo = new Curriculo();

  curriculoEducacao: CurriculoEducacao = new CurriculoEducacao("", "", "", "", this.curriculo,"",false);
  constructor(private router: Router,
    private route: ActivatedRoute,
    private curriculoEducacaoService: CurriculoEducacaoService,
    private curriculoService: CurriculoService,
    private alertService: AlertModelService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tipo = this.route.snapshot.params['tipo'];
    this.idUser = this.route.snapshot.params['idUser'];
    this.curriculo.id = this.id
    if (this.tipo != "editar") {
      this.editarCadastrar = " Avançar"
      environment.titulo = "Criar = Curriculo Educação"
    } else {
      this.editarCadastrar = "Editar"
      environment.titulo = "Criar - Curriculo Educação"
      this.findCurriculoEducacao(this.idUser);
    }
  }

  estadoCursoSelect(event: any) {
    this.estadoCurso = event.target.value;
    this.curriculoEducacao.estadoCurso =  this.estadoCurso;
  }
  

  onInsert() {
    if (this.curriculoEducacao.nomeEscola != "" && this.listCurriculoEducacao.length <= 4)
      if (this.curriculoEducacao.nomeEscola != "") {
        if (this.curriculoEducacao.curso != "") {
          this.listCurriculoEducacao.push(
            new CurriculoEducacao(this.curriculoEducacao.nomeEscola, this.curriculoEducacao.curso, this.curriculoEducacao.mesAnoIn, this.curriculoEducacao.mesAnoFim, this.curriculo,this.curriculoEducacao.estadoCurso ,false))
          this.curriculoEducacao = new CurriculoEducacao("", "", "", "", this.curriculo,this.curriculoEducacao.estadoCurso ,false);
        }
      }
  }
  tipoFormatura(event: any) {
    this.curriculoEducacao.mesAnoIn = event.target.value;
    this.curriculoEducacao.mesAnoFim = event.target.value
  }
  tipoCurso(event: any) {
    this.curriculoEducacao.curso = event.target.value;
  }
  onDelete(n) {
    this.curriculoEducacaoService.deleteCurriculoEducacao(this.listCurriculoEducacao[n].id).subscribe(() => {
    })
    this.listCurriculoEducacao.splice(n, 1);
    this.alertService.showAlertInfo('curriculo deletado')
    this.findCurriculoEducacao( this.idUser);
  }

  saveEndNextStap() {
    if (this.tipo != "editar") {
      this.curriculoEducacaoService.postAllCurriculoEducacao(this.listCurriculoEducacao).subscribe((resp: CurriculoEducacao[]) => {
        this.listCurriculoEducacao = null;
        this.listCurriculoEducacao = resp;
        this.alertService.showAlertInfo('curriculo criado')
        this.router.navigate(["criar-curriculo-profissional/", this.id])
      })
    } else {
      //TODO aqui era pra ser putAll
      this.listCurriculoEducacao.map(educacao => {
        educacao.curriculo = this.curriculo;
        educacao.curriculo.id = this.id;
      })
      this.curriculoEducacaoService.putAllCurriculoEducacao(this.listCurriculoEducacao).subscribe((resp: CurriculoEducacao[]) => {
        this.listCurriculoEducacao = null;
        this.listCurriculoEducacao = resp;
        this.findCurriculoEducacao( this.idUser);
        this.alertService.showAlertInfo('curriculo editado')
        this.router.navigate(["criar-curriculo-profissional/", "editar", this.id, this.idUser])
      })

    }

  }
  findCurriculoEducacao(idUser: number) {
    this.curriculoService.getByUserCurriculo(idUser).subscribe((resp: any) => {
      this.listCurriculoEducacao = resp.educacao;
    })
  }

}