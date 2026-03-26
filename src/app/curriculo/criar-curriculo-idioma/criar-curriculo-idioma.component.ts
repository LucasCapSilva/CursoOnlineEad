import { AlertModelService } from './../../shared/alert-model.service';
import { CurriculoService } from './../../service/curriculo.service';
import { CurriculoIdiomaService } from './../../service/curriculo-idioma.service';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { CurriculoIdioma } from './../../model/CurriculoIdioma';
import { Curriculo } from './../../model/Curriculo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-curriculo-idioma',
  templateUrl: './criar-curriculo-idioma.component.html',
  styleUrls: ['./criar-curriculo-idioma.component.css']
})
export class CriarCurriculoIdiomaComponent implements OnInit {
  id: number;
  idUser:number;
  tipo: string;
  idiomaSelect = ""
  nivelSelect = ""
  editarCadastrar = ""
  listCurriculoIdioma = [
  ];
  curriculo = new Curriculo();
  

  curriculoIdioma: CurriculoIdioma = new CurriculoIdioma("", "", this.curriculo);
  constructor(private router: Router,
    private route: ActivatedRoute,
    private curriculoIdiomaService: CurriculoIdiomaService,
    private curriculoService: CurriculoService,
    private alertService: AlertModelService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tipo = this.route.snapshot.params['tipo'];
    this.idUser = this.route.snapshot.params['idUser'];
    this.curriculo.id = this.id
    if (this.tipo != "editar") {
      this.editarCadastrar = "Avançar"
      environment.titulo = "Criar - Curriculo Idioma"
    } else {
      this.editarCadastrar = "Editar"
      environment.titulo = "Editar - Curriculo Idioma"
      this.findCurriculoIdioma(this.idUser);
    }


  }

 

  onInsert() {
    if(this.curriculoIdioma.idioma != "" && this.listCurriculoIdioma.length < 4)
    if (this.curriculoIdioma.idioma != "") {
      if (this.curriculoIdioma.nivel != "") {
        this.listCurriculoIdioma.push(
          new CurriculoIdioma(this.curriculoIdioma.idioma, this.curriculoIdioma.nivel, this.curriculo))
        this.curriculoIdioma.idioma = "";
        this.curriculoIdioma.nivel = "";
        this.nivelSelect = ""
        this.idiomaSelect = ""
      }
    }

  }

  tipoNivel(event: any) {
    this.curriculoIdioma.nivel = event.target.value
    this.nivelSelect = event.target.value
  }

  tipoIdioma(event: any) {
    this.curriculoIdioma.idioma = event.target.value;
    this.idiomaSelect = event.target.value
  }

  onDelete(n) {
      this.curriculoIdiomaService.deleteCurriculoIdioma(this.listCurriculoIdioma[n].id).subscribe(()=>{
      })
       this.listCurriculoIdioma.splice(n, 1);
       this.alertService.showAlertInfo('curriculo deletado')
      this.findCurriculoIdioma(this.idUser);
  }

  findCurriculoIdioma(idUser:number){
    this.curriculoService.getByUserCurriculo(idUser).subscribe((resp: any)=>{
      this.listCurriculoIdioma = resp.idiomas;
        }) 
  }

 

  saveEndNextStap() {
    if (this.tipo != "editar") {
      this.curriculoIdiomaService.postAllCurriculoIdioma(this.listCurriculoIdioma).subscribe((resp: CurriculoIdioma[]) => {
        this.listCurriculoIdioma = null;
        this.listCurriculoIdioma = resp;
        this.alertService.showAlertInfo('curriculo criado')
       this.router.navigate(["criar-curriculo-portifolio/", this.id])
      })
    } else {
      //TODO aqui era pra ser putAll
      this.listCurriculoIdioma.map(idioma =>{
        idioma.curriculo = this.curriculo;
        idioma.curriculo.id = this.id;
      })
      this.curriculoIdiomaService.putAllCurriculoIdioma(this.listCurriculoIdioma).subscribe((resp: CurriculoIdioma[]) => {
        this.listCurriculoIdioma = null;
        this.listCurriculoIdioma = resp;
        this.findCurriculoIdioma(this.idUser);
        
        this.alertService.showAlertInfo('curriculo editado')
        this.router.navigate(["criar-curriculo-portifolio/","editar", this.id,this.idUser])
        // this.router.navigate(["criar-curriculo-profissional/", this.id])
      })

    }

  }

}