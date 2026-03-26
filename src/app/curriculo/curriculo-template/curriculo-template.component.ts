import { AlertModelService } from './../../shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Curriculo } from './../../model/Curriculo';
import { CurriculoService } from './../../service/curriculo.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-curriculo-template',
  templateUrl: './curriculo-template.component.html',
  styleUrls: ['./curriculo-template.component.css']
})
export class CurriculoTemplateComponent implements OnInit {
  curriculo: Curriculo = new Curriculo;
  curriculoPut: Curriculo = new Curriculo;
  userId: number = environment.idUsuario;
  curriculoId: number = 0;
  imagem: any = 'https://i.imgur.com/iPnUWdQ.png'
  emprego:boolean=false;
  idCurso:number;
  curriculoExtraNum= 0;
  curriculoExtra: boolean = false;
  curriculoEduNum= 0;
  curriculoEdu: boolean = false;
  curriculoEducacao= []
  curriculoAtividade = []
  id:number=0;
  constructor(
    private curriculoService: CurriculoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModelService
  ) { }

  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];
    if (id == null) {
      this.findCurriculoById(environment.idUsuario);
    } else {
      this.findCurriculoById(id);
     
    }

  }

  curriculoEmpregado(){
   
    this.putCurriculo(this.curriculo) 
  }

  temExtraCurriculares(){
    this.curriculo.curriculoEducacao.forEach(educacao => {
      if(educacao.extraCurricular){
        this.curriculoExtraNum++;
      }
    });
    this.curriculo.curriculoEducacao.forEach(educacao => {
      if(!educacao.extraCurricular){
        this.curriculoEduNum++;
      }
    });
    if(this.curriculoExtraNum != 0){
      this.curriculo.temExtra = true;
    }
    if(this.curriculoEduNum != 0){
      this.curriculo.temEduca = true;
    }
 
  }

  putCurriculo(curriculo: Curriculo) {
    this.curriculoPut.emprego = true;
   
    this.curriculoPut.id = curriculo.id;
    this.curriculoPut.foto = curriculo.foto;
    this.curriculoPut.nome = curriculo.nome;
    this.curriculoPut.user = new User
    this.curriculoPut.user.id = environment.idUsuario
    this.curriculoPut.sobrenome = curriculo.sobrenome;
    this.curriculoPut.celular = curriculo.celular;
    this.curriculoPut.estado = curriculo.estado;
    this.curriculoPut.cidade = curriculo.cidade;
    this.curriculoPut.linkLinKedIn = curriculo.linkLinKedIn
    this.curriculoPut.email = curriculo.email;
    this.curriculoPut.linkGitHub = curriculo.linkGitHub;
    this.curriculoPut.sobreMim = curriculo.sobreMim;
    this.curriculoPut.linkVideo = curriculo.linkVideo;
    this.curriculoPut.estado = curriculo.estado;
    this.curriculoPut.cidade = curriculo.cidade;
    this.curriculoService.putCurriculo(this.curriculoPut).subscribe((resp: Curriculo) => {
      this.curriculo = resp;
      this.findCurriculoById(environment.idUsuario);

    })
  }

  findCurriculoById(idUser: number) {
    this.curriculoService.getByUserCurriculo(idUser).subscribe((resp: any) => {
      this.curriculo = resp;
      this.curriculo.curriculoTecnico = resp.tecnicas
      this.curriculo.curriculoComportamentais = resp.comportamentais
      this.curriculo.curriculoProfissional = resp.profissionais
      this.curriculo.curriculoEducacao = resp.educacao 
      this.curriculo.curriculoIdioma = resp.idiomas
      this.curriculo.curriculoPortifolio = resp.portifolios
      this.curriculo.curso = resp.curso
     this.curriculo.curriculoEducacao.forEach(edu => {
       if (edu.extraCurricular) {
         this.curriculoAtividade.push(edu);
       }else{
        this.curriculoEducacao.push(edu);
       }
     });
      this.imagem = this.curriculo.foto
      this.temExtraCurriculares();
      
    },
      err => {
        this.router.navigate(["curriculo"])
      })
  }

  printSemContatos() {
    this.curriculo.celular = "indisponivel";
    this.curriculo.email = "indisponivel";
    this.curriculo.linkGitHub = "";
    this.curriculo.linkLinKedIn = "";
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
    popupWin.document.close();
    this.findCurriculoById(environment.idUsuario);
  }

}
