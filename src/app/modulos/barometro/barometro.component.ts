import { Resposta } from './../../model/RespostaAula';
import { AtividadesRevisaoService } from './../../service/atividades-revisao.service';
import { UploadVideo } from './../../model/UploadVideo';
import { ModuloService } from './../modulo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModelService } from './../../shared/alert-model.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
@Component({
  selector: 'app-barometro',
  templateUrl: './barometro.component.html',
  styleUrls: ['./barometro.component.css']
})
export class BarometroComponent implements OnInit {

  barometro: string = '0';
  aula: UploadVideo = new UploadVideo()
  idModulo = environment.idModulo;
  resposta: Resposta = new Resposta()

  respUm: Resposta
  respDois: Resposta
  respTres: Resposta

  resultUm: boolean
  resultDois: boolean
  resultTres: boolean
  resultVazioUm: boolean = true
  resultVazioDois: boolean = true
  resultVazioTres: boolean = true

  opcaoDesabled: boolean = false

  cor = environment.corModulo

  constructor(
    private alertService: AlertModelService,
    private router: Router,
    private route: ActivatedRoute,
    private moduloService: ModuloService,
    private questaoService: AtividadesRevisaoService
  ) { }

  ngOnInit() {
    environment.respQuestVideo = false
    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }


    let idVideo = this.route.snapshot.params['id']
    this.findByIdAula(idVideo)

  }

  findByIdAula(id: number) {
    this.moduloService.getIdAulas(this.idModulo, id).subscribe((resp: UploadVideo) => {
      this.aula = resp;

      environment.idAula = this.aula.id

      this.aula.questao.forEach(resp =>{
        this.respUm = resp.responstas[0]
        this.respDois = resp.responstas[1]
        this.respTres = resp.responstas[2]
      })

    });
  }

  pegarBarometro() {
    environment.valorBarometroVideo = this.barometro
  }

  opUm(correta) {

    var txtUm = document.getElementById('txtUm')

      if (correta == true) {
        txtUm.style.color = '#228B22'
        txtUm.style.fontWeight = 'bold'
        txtUm.style.backgroundColor = '#adebad'
        this.resultUm = true
        this.resultVazioUm = false
        environment.respQuestVideo = true
        this.opcaoDesabled = true
      } else {
        txtUm.style.color = 'red'
        txtUm.style.fontWeight = 'bold'
        txtUm.style.backgroundColor = '#ff9999'
        this.resultUm = false
        this.resultVazioUm = false
        environment.respQuestVideo = false
      }



  }

  opDois(correta) {

   var txtDois = document.getElementById('txtDois')

    if (correta == true) {
      txtDois.style.color = '#228B22'
      txtDois.style.fontWeight = 'bold'
      txtDois.style.backgroundColor = '#adebad'
      this.resultDois = true
      this.resultVazioDois = false
      environment.respQuestVideo = true
      this.opcaoDesabled = true
    } else {
      txtDois.style.color = 'red'
      txtDois.style.fontWeight = 'bold'
      txtDois.style.backgroundColor = '#ff9999'
      this.resultDois = false
      this.resultVazioDois = false
      environment.respQuestVideo = false
    }



}

opTres(correta) {

  var txtTres = document.getElementById('txtTres')

  if (correta == true) {
    txtTres.style.color = '#228B22'
    txtTres.style.fontWeight = 'bold'
    txtTres.style.backgroundColor = '#adebad'
    this.resultTres = true
    this.resultVazioTres = false
    environment.respQuestVideo = true
    this.opcaoDesabled = true
  } else {
    txtTres.style.color = 'red'
    txtTres.style.fontWeight = 'bold'
    txtTres.style.backgroundColor = '#ff9999'
    this.resultTres = false
    this.resultVazioTres = false
    environment.respQuestVideo = false
  }



}
}
