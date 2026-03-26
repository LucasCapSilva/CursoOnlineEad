import { ActivatedRoute, Router } from '@angular/router';
import { Resposta } from './../model/RespostaAula';
import { QuestaoAula } from './../model/QuestaoAula';
import { UploadVideo } from './../model/UploadVideo';
import { AlertModelService } from './../shared/alert-model.service';
import { AtividadesRevisaoService } from './../service/atividades-revisao.service';
import { ModuloService } from './../modulos/modulo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-atividades-revisao',
  templateUrl: './editar-atividades-revisao.component.html',
  styleUrls: ['./editar-atividades-revisao.component.css']
})
export class EditarAtividadesRevisaoComponent implements OnInit {
  idVideo: number;
  idAulaListar: number

  aula: UploadVideo = new UploadVideo()
  listaAulas: UploadVideo[]

  questao: QuestaoAula = new QuestaoAula()
  respostas: Resposta = new Resposta()
  listaRespostas: Resposta[]

  respUm: string
  respDois: string
  respTres: string

  check = false


  respOk = false
  questOk = false

  constructor(
    private moduloService: ModuloService,
    private questaoService: AtividadesRevisaoService,
    private alertas: AlertModelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.findAllAulas()

    let rotaAtual = this.router.url

    if (rotaAtual.indexOf('quest') == -1) {
      let idResp = this.route.snapshot.params['id']
      this.findByIdResposta(idResp)
      this.respOk = true
    } else {
      let idQuestao = this.route.snapshot.params['id']
      this.fidByIdQuestao(idQuestao)
      this.questOk = true
    }
  }

  findByIdResposta(id: number) {
    this.questaoService.getByIdResposta(id).subscribe((resp: Resposta) => {
      this.respostas = resp

      let iconUm = document.getElementById('iconUm')
      let txtUm = document.getElementById('txtUm')
      let inputUm = document.getElementById('inputUm')

      if (this.respostas.correta == true) {
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
    })
  }

  fidByIdQuestao(id: number) {
    this.questaoService.getByIdQuestao(id).subscribe((resp: QuestaoAula) => {
      this.questao = resp
    })
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
        if (aula.modulo.descricao != 'Deletados') {
          this.listaAulas.push(aula)
        }
      });

    });
  }

  correta(event) {

    this.check = event.target.checked

    let iconUm = document.getElementById('iconUm')
    let txtUm = document.getElementById('txtUm')
    let inputUm = document.getElementById('inputUm')

    if (event.target.checked == true) {
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

  atualizarQuest() {
    this.questao.responstas = []
    this.questao.responstas.forEach(resposta => {
      resposta.questao = this.questao
      this.questaoService.postResposta(resposta).subscribe((resp: Resposta) => {
        this.questao.responstas.push(resp)
      })
    })
    this.aula.id = this.idVideo
    this.questao.aula = this.aula
    this.questaoService.putQuestao(this.questao).subscribe((resp: QuestaoAula) => {
      this.questao = resp
      this.alertas.showAlertSuccess('Questão atualizada com sucesso!')
      this.router.navigate(['/admin'])
    })
  }

  atualizaResp() {
    this.questaoService.putResposta(this.respostas).subscribe((resp: Resposta) => {
      this.respostas = resp
      this.alertas.showAlertSuccess('Resposta atualizada com sucesso!')
      this.router.navigate(['/admin'])
    })
  }

}
