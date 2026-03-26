import { GithubParticipante } from './../model/GithubParticipante';
import { GithubParticipanteService } from './../service/github-participante.service';
import { Camada } from './../model/Camada';
import { PercentEntregasObr } from './../model/PercentEntregasObr';
import { EntregaExerciciosObr } from './../model/EntregaExerciciosObr';
import { EntregasObrigatorias } from './../model/EntregasObrigatorias';
import { AtividadeObrigatoria } from './../model/AtividadeObrigatoria';
import { AtividadesObrigatoriasService } from './../service/atividades-obrigatorias.service';
import { PercentEntregas } from './../model/PercentEntregas';
import { EntregaExercicios } from './../model/EntragaExercicios';
import { element } from 'protractor';
import { AtividadeService } from './../service/atividade.service';
import { User } from './../model/User';
import { Entregas } from './../model/Entregas';
import { Atividade } from './../model/Atividade';
import { Turma } from './../model/Tuma';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { RelatoriosService } from './../service/relatorios.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { environment } from './../../environments/environment.prod';

@Component({
  selector: 'app-entregar-exercicio',
  templateUrl: './entregar-exercicio.component.html',
  styleUrls: ['./entregar-exercicio.component.css']
})
export class EntregarExercicioComponent implements OnInit {
  qtdRespCertas: number = 0;
  atividadeCerta: boolean;
  idTurma = environment.idTurma;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  respObrigatoria: any;
  atividade: Atividade = new Atividade();
  listaAtividade: Atividade[] = [];
  idAtividade: number = 0;
  entregas: Entregas = new Entregas();
  listaEntregas: Entregas[];

  listaEntregasRelatorio: EntregaExercicios[]
  entregasRelatorio: EntregaExercicios = new EntregaExercicios()
  entregasTotal: PercentEntregas = new PercentEntregas()

  listaEntregasRelatorioObr: EntregaExerciciosObr[]
  entregasRelatorioObr: EntregaExerciciosObr = new EntregaExerciciosObr()
  entregasTotalObr: PercentEntregasObr = new PercentEntregasObr()

  atividadeOb: AtividadeObrigatoria = new AtividadeObrigatoria()
  listaAtividadeOb: AtividadeObrigatoria[]

  link = []
  camada: string = '';
  texto: string = '';
  entregaOb: EntregasObrigatorias = new EntregasObrigatorias()
  feedBacksResp = [];
  user: User = new User();
  idUser = environment.idUsuario;

  key = 'data';
  reverse = true;
  page = 1;
  btnEntregar: boolean = false;
  entregaFeita: boolean = false
  camadas: Camada[]
  github: GithubParticipante = new GithubParticipante()
  constructor(
    private relatorioService: RelatoriosService,
    private alertService: AlertModelService,
    private router: Router,
    private atividadeService: AtividadeService,
    private atividadeObService: AtividadesObrigatoriasService,
    public githubService: GithubParticipanteService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.findEntregas()
    this.findEntregasTotal()

    this.findEntregasObr()
    this.findEntregasTotalObr()

    environment.titulo = 'Exercícios'
    environment.icon = 'pencil'

    const token = environment.token;
    this.camadas = []
    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    //this.findByIdParticipanteEAtividade();
    this.getAtividadeByTurmaEUser()
    this.getAllAtividadeByTurmaAndUser()
  }

  scroll() {
    window.scroll(0, 0);
  }

  titulo(nome: string, icon: string) {
    environment.titulo = nome
    environment.icon = icon
  }

  async onInsert() {
    var re = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))")
    if (re.test(this.texto) && this.texto.includes('https://github.com/')) {
      this.link.push({ link: this.texto, camada: this.camada });
      this.texto = '';
      this.camada = '';
    } else {
      this.alertService.showAlertDanger("Coloque um link do github!")
      this.texto = '';
      this.camada = '';
    }



  }
  selectCamada(event: any) {
    this.camada = event.target.value
  }



  getCamadas(idAtividade: number) {
    this.camadas = []
    this.entregaOb.linkEntrega = "";
    this.entregaOb.observacoes = "";
    this.link = []
    this.atividadeObService.getCamada(idAtividade).subscribe((resp: Camada[]) => {
      this.camadas = resp

    })
  }

  getAllAtividadeByTurmaAndUser() {
    this.atividadeObService.getAllAtividadeByTurmaAndUser(this.idTurma, environment.idUsuario).subscribe((resp: AtividadeObrigatoria[]) => {


      this.listaAtividadeOb = resp
      let loading = document.querySelector('#loading')
      loading.setAttribute('style', 'display: none !important;')
    })
  }

  getAtividadeByTurmaEUser() {
    this.atividadeService.getAtividadeByTurmaEUser(this.idTurma, this.idUser).subscribe((resp: Atividade[]) => {
      this.listaAtividade = resp;
      let loading = document.querySelector('#loading2')
      loading.setAttribute('style', 'display: none !important;')
    });
  }

  validado() {
    this.getAllAtividadeByTurmaAndUser();
    this.findEntregasObr()
    this.findEntregasTotal()
  }







  entregarOb(id: number) {

    this.githubService.getGithubByUserId(environment.idUsuario).subscribe((resp: GithubParticipante) => {
      this.github = resp

      this.btnEntregar = true;
      this.atividadeCerta = false;
      this.user.id = this.idUser;
      this.entregaOb.usuario = this.user;
      this.atividadeOb.id = id;
      this.entregaOb.atividade = this.atividadeOb
      this.entregaOb.atividade = this.atividadeOb
      this.entregaOb.entregue = true
      this.entregaOb.link = this.link;

      if (this.entregaOb.linkEntrega != "") {
       
          this.atividadeObService.postEntrega(this.entregaOb).subscribe((resp: EntregasObrigatorias) => {
            this.respObrigatoria = resp;
            this.feedBacksResp = [];
            this.respObrigatoria.forEach(camadaResp => {
              if (camadaResp.feedback == "Correto: ") {
                this.qtdRespCertas++;
              }
            });

            if (this.qtdRespCertas == this.respObrigatoria.length) {
              this.atividadeCerta = true;

            } else {
              this.atividadeCerta = false;
              this.respObrigatoria.forEach(camadaResp => {
                this.feedBacksResp.push(camadaResp)

              })
            }


            // $event.srcElement.disabled = false;
            this.getAllAtividadeByTurmaAndUser();
            this.findEntregasObr()
            this.findEntregasTotal()
            // window.scroll(0,0)

          }, err => {
            if (err.status == 500) {
              this.feedBacksResp = [];
              this.feedBacksResp.push({ camada: "desconhecida", feedback: "Você esta inserindo uma camada que não existe nesta atividade, favor inserir uma camada do git hub referente a atividade" });

            }
            else if (err.status == 404) {
              this.feedBacksResp = [];
              this.feedBacksResp.push({ camada: "desconhecida", feedback: "Usuario do github não cadastrado na base de dados, favor inserir um link do github referente a sua conta do github" });
            }
            else if (err.status == 401) {
              this.feedBacksResp = [];
              this.feedBacksResp.push({ camada: "desconhecida", feedback: "Usuario não autenticado" });
            } else {
              console.table(err)
              this.feedBacksResp.push({ camada: "desconhecida", feedback: err.error.message });
            }

          });

       
        
      } else {
        this.feedBacksResp = [];
        this.feedBacksResp.push({ camada: "desconhecida", feedback: "campos das camadas de validação de codigo precisam ser preenchidos" });
      }

    }, err => {
      this.feedBacksResp = [];
      this.feedBacksResp.push({ camada: "desconhecida", feedback: "Você precisa cadastrar seu gitHub na plataforma para entregar atividades técnicas!" });
    })


  }

  entregar(id: number) {
    this.btnEntregar = true;
    this.user.id = this.idUser;
    this.entregas.usuario = this.user;
    this.atividade.id = id;
    this.entregas.atividade = this.atividade;


    this.atividadeService.postEntrega(this.entregas).subscribe((resp: Entregas) => {
      this.entregas = resp;
      this.alertService.showAlertSuccess('Exercício entregue com sucesso! todas as camadas estão corretas! Parabens!');
      this.entregas = new Entregas();
      this.getAtividadeByTurmaEUser();
      this.findEntregas()
      this.findEntregasTotal()
      window.scroll(0, 0)
    }, err => {

      this.alertService.showAlertDanger(`Erro ao inserir o entrega: ${err.status}`);
    });



    setTimeout(() => {
      this.btnEntregar = false;
    }, 2000);

  }

  findByIdParticipanteEAtividade() {
    this.atividadeService.getByIdParticipanteEAtividade(this.idUser)
      .subscribe((resp: Entregas) => {
        this.entregas = resp;
      });
  }

  clearModel() {
    this.entregas = new Entregas();
  }

  clearModelOb() {
    this.entregaOb = new EntregasObrigatorias();
  }

  findEntregas() {
    this.entregasRelatorio.nome = environment.nome
    this.relatorioService.getByFilterEntregas('', this.idTurma, this.entregasRelatorio.nome).subscribe((resp: EntregaExercicios[]) => {
      this.listaEntregasRelatorio = resp;
    })
  }

  findEntregasTotal() {
    this.relatorioService.getByEntregasTotal(environment.idUsuario, environment.idTurma).subscribe((resp: PercentEntregas) => {
      this.entregasTotal = resp
    })
  }

  findEntregasObr() {
    this.relatorioService.getByFilterEntregasObr('', this.idTurma, environment.nome).subscribe((resp: EntregaExerciciosObr[]) => {
      this.listaEntregasRelatorioObr = resp;
    })
  }

  findEntregasTotalObr() {
    this.relatorioService.getByEntregasTotalObr(environment.idUsuario, environment.idTurma).subscribe((resp: PercentEntregasObr) => {
      this.entregasTotalObr = resp
    })
  }
}