import { CurriculoEducacao } from './../../model/CurriculoEducacao';
import { Turma } from './../../model/Tuma';
import { LiberarAulasService } from './../../service/liberar-aulas.service';
import { AuthService } from './../../service/auth.service';
import { CurriculoService } from './../../service/curriculo.service';
import { Component, OnInit } from '@angular/core';
import { AlertModelService } from 'src/app/shared/alert-model.service';
import { Router } from '@angular/router';
import { CurriculoMassa } from 'src/app/model/CurriculoMassa';

@Component({
  selector: 'app-view-curriculo-all',
  templateUrl: './view-curriculo-all.component.html',
  styleUrls: ['./view-curriculo-all.component.css']
})
export class ViewCurriculoAllComponent implements OnInit {
  listaCurriculo = [];
  listaCurriculoMassa: CurriculoMassa[] = [];
  curriculoEducacaos = []
  curriculoAtividade = []
  listaCurriculoSemContato = []
  listaTurma: Turma[];
  // atributos para busca especifica de curriculo
  turma: Turma = new Turma();
  idTurma: number;
  genero: string;
  curso: string;
  isPcd: boolean;
  raca: string;
  typePcd: string;
  portifolio: string;
  descricaoTecnica: string;
  cargo: string;
  principaisAtividades: string;
  idioma: string
  nivel: string
  numeroPi: number;
  idiomaSelect = "";
  isPcdSelect: boolean;
  nivelSelect = "";
  carregando: boolean = false
  curriculoEducacao: CurriculoEducacao;
  curriculoExtraNum = 0;
  curriculoExtra: boolean = false;
  curriculoEduNum = 0;
  curriculoEdu: boolean = false;


  // atributos para busca especifica de curriculo

  imagem: any = 'https://i.imgur.com/iPnUWdQ.png'

  constructor(
    private curriculoService: CurriculoService,
    public auth: AuthService,
    public aulaLiberadaService: LiberarAulasService,
    private alertService: AlertModelService
  ) { }

  ngOnInit(): void {
    this.findAllTurma()

  }


  // buscas especificas curriculo

  tipoNivel(event: any) {
    this.nivelSelect = event.target.value
    this.nivel = this.nivelSelect;

  }

  tipoIdioma(event: any) {
    this.idiomaSelect = event.target.value
    this.idioma = this.idiomaSelect;
  }

  tipoIsPcd(event: any) {
    this.isPcdSelect = event.target.value
    this.isPcd = this.isPcdSelect;
  }
  selectGenero(event: any) {

    this.genero = event.target.value;

  }
  selectRaca(event: any) {
    this.raca = event.target.value;
  }
  selectTypePcd(event: any) {
    this.typePcd = event.target.value;
  }
  selectNumeroPi(event: any) {
    this.numeroPi = event.target.value;
    this.portifolio = event.target.value;
  }

  findCurriculoByGenero() {
    this.carregando = true;
    this.listaCurriculo = null;
    this.curso = ""
    this.portifolio = ""
    this.descricaoTecnica = ""
    this.cargo = ""
    this.principaisAtividades = ""
    this.raca = "";
    this.typePcd = "";
    // this.idioma=""
    // this.nivel=""
    // this.idiomaSelect = "";
    // this.nivelSelect = "";
    console.log(this.genero);
    this.curriculoService.getByGenero(this.genero).subscribe((resp: any) => {

      this.listaCurriculo = resp
      console.log("lista curriculo" + JSON.stringify(this.listaCurriculo));
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');

    })
  }

  findCurriculoByRaca() {
    this.carregando = true;
    this.listaCurriculo = null;
    this.curso = ""
    this.portifolio = ""
    this.descricaoTecnica = ""
    this.cargo = ""
    this.principaisAtividades = ""
    this.genero = ""
    this.typePcd = "";
    // this.idioma=""
    // this.nivel=""
    // this.idiomaSelect = "";
    // this.nivelSelect = "";
    this.curriculoService.getByRaca(this.raca).subscribe((resp: any) => {

      this.listaCurriculo = resp
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');

    })
  }

  findCurriculoBytypePcd() {
    this.carregando = true;
    this.listaCurriculo = null;
    this.curso = ""
    this.portifolio = ""
    this.descricaoTecnica = ""
    this.cargo = ""
    this.principaisAtividades = ""
    this.genero = ""
    this.raca = "";

    // this.idioma=""
    // this.nivel=""
    // this.idiomaSelect = "";
    // this.nivelSelect = "";
    this.curriculoService.getByTypePcd(this.typePcd).subscribe((resp: any) => {

      this.listaCurriculo = resp
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');

    })
  }

  temExtraCurriculares() {
    this.curriculoExtraNum = 0;
    this.curriculoEduNum = 0;
    this.curriculoEducacaos = []
    this.curriculoAtividade = []
    for (let index = 0; index < this.listaCurriculo.length; index++) {
        this.listaCurriculoMassa.push(this.listaCurriculo[index])
     
      this.listaCurriculo[index].educacao.forEach(curriculo => {

        if (curriculo.extraCurricular) {
          this.curriculoAtividade.push(curriculo)
          this.curriculoExtraNum++;
        }

      });
      this.listaCurriculo[index].educacao.forEach(curriculo => {

        if (!curriculo.extraCurricular) {
          this.curriculoEducacaos.push(curriculo)
          this.curriculoEduNum++;

        }

      });
      if (this.curriculoExtraNum != 0) {
        this.listaCurriculo[index].temExtra = true;
      }
      if (this.curriculoEduNum != 0) {
        this.listaCurriculo[index].temEduca = true;
      }
      this.curriculoEducacaos.splice(4,30)
      this.curriculoAtividade.splice(2,30)
      this.listaCurriculoMassa[index].curriculoEducacaos = this.curriculoEducacaos;
      this.listaCurriculoMassa[index].curriculoAtividade = this.curriculoAtividade;
      console.log("curriculoEducacaos "+ JSON.stringify( this.listaCurriculoMassa[index].curriculoEducacaos))
      console.log("curriculoAtividade "+ JSON.stringify( this.listaCurriculoMassa[index].curriculoAtividade))
    }

   
   

  }

  findCurriculoByIsPcd() {
    this.carregando = true;
    this.listaCurriculo = null;
    this.curso = ""
    this.portifolio = ""
    this.descricaoTecnica = ""
    this.cargo = ""
    this.principaisAtividades = ""
    this.genero = ""
    this.raca = "";
    this.typePcd = "";
    // this.idioma=""
    // this.nivel=""
    // this.idiomaSelect = "";
    // this.nivelSelect = "";
    this.curriculoService.getByIsPcd(this.isPcd).subscribe((resp: any) => {

      this.listaCurriculo = resp
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');

    })
  }

  findCurriculoByIdioma() {
    this.carregando = true;
    this.curso = ""
    this.portifolio = ""
    this.descricaoTecnica = ""
    this.cargo = ""
    this.principaisAtividades = ""
    // this.idioma=""
    // this.nivel=""
    // this.idiomaSelect = "";
    // this.nivelSelect = "";
    this.curriculoService.getByIdiomaCurriculo(this.idioma, this.nivel).subscribe((resp: any) => {

      this.listaCurriculo = resp
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');

    })
  }


  findCurriculoByIdTurma() {
    this.carregando = true;
    this.curso = ""
    this.portifolio = ""
    this.descricaoTecnica = ""
    this.cargo = ""
    this.principaisAtividades = ""
    this.idioma = ""
    this.nivel = ""
    this.idiomaSelect = "";
    this.nivelSelect = "";
   
    this.listaCurriculo = []
    this.curriculoService.getByTurmaCurriculo(this.idTurma).subscribe((resp: any) => {

      this.listaCurriculo = resp
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');

    })

  }

  findCurriculoByEducacao() {
    this.carregando = true;
    // this.curso=""
    this.portifolio = ""
    this.descricaoTecnica = ""
    this.cargo = ""
    this.principaisAtividades = ""
    this.idioma = ""
    this.nivel = ""
    this.idiomaSelect = "";
    this.nivelSelect = "";
    this.curriculoService.getByEducacaoCurriculo(this.curso).subscribe((resp: any) => {

      this.listaCurriculo = resp
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');

    })
  }

  findCurriculoByPortifolio() {
    this.carregando = true;
    this.curso = ""
    // this.portifolio=""
    this.descricaoTecnica = ""
    this.cargo = ""
    this.principaisAtividades = ""
    this.idioma = ""
    this.nivel = ""
    this.idiomaSelect = "";
    this.nivelSelect = "";
    console.log("portifolio " + this.portifolio)
    this.curriculoService.getAllCurriculoByTurmaIdAndNumPi(this.turma.id, this.numeroPi).subscribe((resp: any) => {

      this.listaCurriculo = resp
      console.log(JSON.stringify(this.listaCurriculo))
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');

    })
  }

  findCurriculoByTecnico() {
    this.curso = ""
    this.portifolio = ""
    // this.descricaoTecnica=""
    this.cargo = ""
    this.principaisAtividades = ""
    this.idioma = ""
    this.nivel = ""
    this.idiomaSelect = "";
    this.nivelSelect = "";
    this.curriculoService.getByTecnicaCurriculo(this.descricaoTecnica).subscribe((resp: any) => {

      this.listaCurriculo = resp
      this.temExtraCurriculares();

    })
  }

  findCurriculoByProfissional() {
    this.carregando = true;
    this.curso = ""
    this.portifolio = ""
    this.descricaoTecnica = ""
    // this.cargo=""
    // this.principaisAtividades=""
    this.idioma = ""
    this.nivel = ""
    this.idiomaSelect = "";
    this.nivelSelect = "";
    this.curriculoService.getByProfissionalCurriculo(this.cargo, this.principaisAtividades).subscribe((resp: any) => {

      this.listaCurriculo = resp
      this.temExtraCurriculares();
      this.carregando = false;
      this.alertService.showAlertSuccess('Pesquisa Feita!');
    })
  }
  // buscas especificas curriculo
  findAllTurma() {
    this.listaTurma = []
    this.aulaLiberadaService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      this.listaTurma = resp
    });
  }

  findByIdTurma() {
    this.aulaLiberadaService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
      this.idTurma = this.turma.id;
    });
  }



  printSemContatos() {
    for (let index = 0; index < this.listaCurriculo.length; index++) {
      this.listaCurriculo[index].celular = "indisponivel";
      this.listaCurriculo[index].email = "indisponivel";
      this.listaCurriculo[index].linkGitHub = "";
      this.listaCurriculo[index].linkLinKedIn = "";
    };
    setTimeout(() => {
      this.print()
    }, 1000);


  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById("print").innerHTML.toString();
    printContents = (<string>printContents + "").replace("col-sm", "col-xs");

    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Reporte</title>
          <meta name="viewport" content="width=10000, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <style>
          img {
            border-radius: 50%;
            width: 13rem;
            height: 13rem;
        }
        p{
            font-size: 1.063rem;
        }
        
        
        .margin-direita{
            margin-right: 2.5rem!important;
        }
        
        .logo-img {
            width: 30px;
            height: 30px;  
            margin-bottom: 4px;
        }
        
        .width-50 {
            width: 50%;
        }
        
        .width-100 {
            width: 100%;
        }
        .resume-title{
            font-size:38px;
            text-transform: uppercase;
        }
        
        .resume-info{
            border-left: 26px solid #E36F68;
            height: 115px;
            padding-top: 3px;
        }
        
        .resume-contact-subtitle{
            color: #7F7F7F;
            font-size: 30px;
        }
        
        .resume-contact-text{
            color: #7F7F7F;
            font-size: 16px;
        }
        
        .separator{
            width: 104%;
            border: 3px solid #E36F68;
            margin-bottom: 0px;
        }
        
        .separator-section{
            width: 104%;
            border: 3px solid #E36F68;
            margin-bottom: 0px;
        }
        
        
        /*ABOUT */
        
        .about-title{
            font-size: 1.5rem;
            padding-top: 16px;
            color: #7F7F7F;
            text-transform: uppercase;
        }
        
        .about-title p{
            color:#E36F68
        }
        
        .about-institution-title{
            font-size: 1.5rem;
            color: #7F7F7F;
            margin: 0;
        }
        
        .about-me, .about-xp{
            width: 100%;
            height: 180px;
            
        }
        
        .about-xp p{
            margin: 0;
        }
        
        .about-education{
            width: 100%;
            height: 204px;
        }
        
        .about-skills-tec, .about-skiils-behavior, .about-projects, .about-language{
            width: 100%;
            height: 207px;
        }
        
        .about-description-title{
            text-transform: uppercase;
            color: black;
            margin: 0;
        }
        
        .about-description{
            color: #7F7F7F;
        }
        
          </style>
        </head>
        <body onload="window.print();">
          ${printContents}
        </body>
      </html>`);
    /* window.close(); */
    this.findCurriculoByIdTurma()
    popupWin.document.close();
  }

}