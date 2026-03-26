import { Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { AlertModelService } from './../shared/alert-model.service';
import { AtividadesRevisaoService } from './../service/atividades-revisao.service';
import { Resposta } from './../model/RespostaAula';
import { QuestaoAula } from './../model/QuestaoAula';
import { UploadVideo } from './../model/UploadVideo';
import { environment } from './../../environments/environment.prod';
import { ModuloService } from './../modulos/modulo.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-criar-atividades-revisao',
  templateUrl: './criar-atividades-revisao.component.html',
  styleUrls: ['./criar-atividades-revisao.component.css']
})
export class CriarAtividadesRevisaoComponent implements OnInit {

  idVideo: number;
  idModulo = environment.idModulo;
  idAulaListar: number

  aula: UploadVideo = new UploadVideo()
  listaAulas: UploadVideo[]

  questao: QuestaoAula = new QuestaoAula()
  respostas: Resposta = new Resposta()
  listaRespostas: Resposta[]

  respUm: string
  respDois: string
  respTres: string

  checkUm = false
  checkDois = false
  checkTres = false

  listaQuestaoOk = false



  constructor(
    private moduloService: ModuloService,
    private questaoService: AtividadesRevisaoService,
    private alertas: AlertModelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.findAllAulas()
  }

  findByIdAula() {
    this.questaoService.getByIdAula(this.idVideo).subscribe((resp: UploadVideo) => {
      this.aula = resp;
    });
  }

  findAllAulas() {
    this.listaAulas = []
    this.moduloService.getAllAulas().subscribe((resp: UploadVideo[]) => {
      resp.forEach(aula => {
        if(aula.modulo.descricao != 'Deletados'){
          this.listaAulas.push(aula)
        }
      });

    });
  }

  findByIdAulaListar(){
    this.questaoService.getByIdAula(this.idAulaListar).subscribe((resp: UploadVideo) => {
      this.aula = resp;
      this.listaQuestaoOk = true
    });

  }

  cadastrarAtividade(){
    this.listaRespostas = []

    this.listaRespostas.push(
      {
        'id' : 0,
        'resp' : this.respUm,
        'correta': this.checkUm,
        'questao': null
      },
      {
        'id' : 0,
        'resp' : this.respDois,
        'correta': this.checkDois,
        'questao': null
      },
      {
        'id' : 0,
        'resp' : this.respTres,
        'correta': this.checkTres,
        'questao': null
      }
    )
    this.aula.id = this.idVideo
    this.questao.aula = this.aula
    this.questao.aula.modulo = null
    this.questao.aula.questao = null
    
    this.questaoService.postQuestao(this.questao).subscribe((resp: QuestaoAula) => {
      this.questao = resp
    })

    setTimeout(() =>{
      this.questao.responstas = []
      this.listaRespostas.forEach(resposta => {
        resposta.questao = this.questao
        this.questaoService.postResposta(resposta).subscribe((resp: Resposta) =>{
          this.questao.responstas.push(resp)
        })
      
      })
    }, 2000)

    this.alertas.showAlertSuccess('Questão cadastrada com sucesso!')
    this.router.navigate(['/home'])

    setTimeout(()=>{
      this.router.navigate(['/admin'])
    }, 500)
  }

  corretaUm(event){

    this.checkUm = event.target.checked

    let iconUm = document.getElementById('iconUm')
    let txtUm = document.getElementById('txtUm')
    let inputUm = document.getElementById('inputUm')

    if(event.target.checked == true){
      iconUm.style.color = '#228B22'
      txtUm.style.color = '#228B22'
      txtUm.style.fontWeight = 'bold'
      inputUm.style.borderColor = '#228B22'
    } else {
      iconUm.style.color = '#A9A9A9'
      txtUm.style.color = '#000'
      txtUm.style.fontWeight = 'normal'
      inputUm.style.borderColor = '#ced4da'
    }
  }

  corretaDois(event){

    this.checkDois = event.target.checked

    let iconDois = document.getElementById('iconDois')
    let txtDois = document.getElementById('txtDois')
    let inputDois = document.getElementById('inputDois')

    if(event.target.checked == true){
      iconDois.style.color = '#228B22'
      txtDois.style.color = '#228B22'
      txtDois.style.fontWeight = 'bold'
      inputDois.style.borderColor = '#228B22'
    } else {
      iconDois.style.color = '#A9A9A9'
      txtDois.style.color = '#000'
      txtDois.style.fontWeight = 'normal'
      inputDois.style.borderColor = '#ced4da'
    }

  }

  corretaTres(event){

    this.checkTres = event.target.checked

    let iconTres = document.getElementById('iconTres')
    let txtTres = document.getElementById('txtTres')
    let inputTres = document.getElementById('inputTres')

    if(event.target.checked == true){
      iconTres.style.color = '#228B22'
      txtTres.style.color = '#228B22'
      txtTres.style.fontWeight = 'bold'
      inputTres.style.borderColor = '#228B22'
    } else {
      iconTres.style.color = '#A9A9A9'
      txtTres.style.color = '#000'
      txtTres.style.fontWeight = 'normal'
      inputTres.style.borderColor = '#ced4da'
    }

  }

  onDeleteUser(item) {
    const result$ = this.alertas.showConfirm('Confirmação', 'Deseja realmente apagar essa atividade?', 'Sim', 'Não');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.questaoService.deleteQuestao(item.id) : EMPTY)
      ).subscribe(() => {
        this.alertas.showAlertSuccess('Atividade removida com sucesso!')
        this.idAulaListar = 0
        this.listaQuestaoOk = false
      }, err => {
      
      });
  }

}
