import { AulasService } from './../../service/aulas.service';
import { TrilhaService } from './../../service/trilha.service';
import { AuthService } from './../../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { AtividadesRevisaoService } from './../../service/atividades-revisao.service';
import { QuestAulaValid } from './../../model/QuestAulaValid';
import { AlertModelService } from './../../shared/alert-model.service';
import { User } from './../../model/User';
import { Barometro } from './../../model/Barometro';
import { Modulo } from './../../model/Modulo';
import { UploadVideo } from './../../model/UploadVideo';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuloService } from './../modulo.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  isExpanded = true;
  isRead = true;
  state = 'collapsed';
  faBars = faBars;
  faForward = faForward;
  faBackward = faBackward;
  idAula: number
  video: string
  nomeVideo: string
  temaAula = environment.temaModulo
  cor = environment.corModulo
  idVideo: number;
  listaAulas: UploadVideo[];
  aula: UploadVideo = new UploadVideo();
  qtdAulas: number;
  temAula: boolean = false;
  playVideo: boolean;
  linkAvaliacao: string;

  idUsuario = environment.idUsuario;
  idModulo = environment.idModulo;
  idTurma = environment.idTurma
  adm = false;
  modulo: Modulo = new Modulo();
  listaModulos: Modulo[];
  profile = environment.profile;
  naoTemVideo:boolean=false;
  barometro: boolean = true;
  valorBarometro: string;
  modelBarometro: Barometro = new Barometro();
  user: User = new User();
  aulaOk: boolean = false;
  preenchido: any;
  order: string;

  atividadeRevisao: QuestAulaValid = new QuestAulaValid()
  listaAtividadeRevisao: QuestAulaValid[]

  respQuestVideo = environment.respQuestVideo
  trilha = environment.trilha;
  @ViewChild('videoPlayer') videoplayer: ElementRef;



  constructor(
    private moduloService: ModuloService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModelService,
    private atividadesRevisaoService: AtividadesRevisaoService,
    private trilhaService: TrilhaService,
    private aulasService: AulasService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    if (this.trilha) {
      this.idVideo = this.route.snapshot.params['id'];
      this.findByIdAula();
      this.trilhaService.getById(environment.idModulo).subscribe((resp: any) => {
        this.listaAtividadeRevisao = [];
        this.linkAvaliacao = resp.linkAvaliacao;
        resp.aulas.sort((a, b) => (a.num_sequencia > b.num_sequencia) ? 1 : -1);
        console.log(resp.aulas)
        resp.aulas.forEach((element) => {
            console.log("teste")
            let objeto = new QuestAulaValid();
            objeto.aula = element;
            objeto.liberado = true;
            objeto.liberado = true;
            objeto.usuario = null;
            this.listaAtividadeRevisao.push(objeto);  
        });
        console.log(JSON.stringify(this.listaAtividadeRevisao))
      })
      
    } else {
      this.idVideo = this.route.snapshot.params['id'];
      this.findByIdModulo();
      this.findByIdAula();
      this.findAulaByAtividades()
  
      window.scroll(0, 0);
  
      const token = environment.token
      if (token == '') {
        this.alertService.showAlertInfo('Antes de começar, faça o login!');
        this.router.navigate(['/login']);
      }
  
      if (this.aula.titulo != null) {
        this.temAula = true;
      }
  
      if (this.profile !== 'ROLE_PARTICIPANTE') {
        this.adm = true;
      }
    }
  
  }

  videoAssistido(event) {
    if (event.target.currentTime == event.target.duration) {
      this.aulaOk = true;
    }
  }

  findAulaByAtividades() {
    this.listaAtividadeRevisao = []
    this.atividadesRevisaoService.getAulasByAtividadByList(this.idUsuario, this.idModulo).subscribe((resp: QuestAulaValid[]) => {
      resp.sort((a, b) => (a.aula.num_sequencia > b.aula.num_sequencia) ? 1 : -1);
      resp.forEach((i) => {
        if (i.liberado||this.adm == true) {
          this.listaAtividadeRevisao.push(i)
        }
      })
     
    })
  }

  // Módulos

  findByIdModulo() {

    this.moduloService.getIdModulo(this.idModulo, this.idTurma, this.idUsuario).subscribe((resp: Modulo) => {
   
      this.modulo = resp;

      if (this.modulo.aulas.length === 0) {
        if (this.idModulo === 1 || this.idModulo === 2 || this.idModulo === 3 || this.idModulo === 27) {
          this.router.navigate(['/modulo-um']);
          this.alertService.showAlertInfo('Não existem aulas liberadas para você nessa matéria.');
        }
        if (this.idModulo === 4 || this.idModulo === 5 || this.idModulo === 6  || this.idModulo === 30) {
          this.router.navigate(['/modulo-dois']);
          this.alertService.showAlertInfo('Não existem aulas liberadas para você nessa matéria.');
        }
        if (this.idModulo === 7 || this.idModulo === 8 || this.idModulo === 9) {
          this.router.navigate(['/modulo-tres']);
          this.alertService.showAlertInfo('Não existem aulas liberadas para você nessa matéria.');
        }
        if (this.idModulo === 45 || this.idModulo === 47 || this.idModulo === 48 || this.idModulo === 49 || this.idModulo === 50 || this.idModulo === 51 || this.idModulo === 52) {
          this.router.navigate(['/modulo-soft']);
          this.alertService.showAlertInfo('Não existem aulas liberadas para você nessa matéria.');
        }
      }

      if (this.modulo.aulas.length < this.idVideo) {
        if (this.auth.participante()) {
          this.alertService.showAlertDanger('Essa aula ainda não está disponível para você!')
          this.router.navigate(['/blocos'])
        }
       
      }
    });
  }

  // Aulas

  findByIdAula() {
    this.naoTemVideo = false;
   if (this.trilha) {
    this.aulasService.getByIdModulo(this.idModulo, this.idVideo).subscribe((resp: any) => {
      this.aula = resp;
      if (!this.aula.linkVideo.includes('mkv')) {
        this.naoTemVideo = true;
        // alert("Não existe video para essa aula!")
      }else{
        this.naoTemVideo = false;
      }
     })
   } else {
    this.moduloService.getIdAulas(this.idModulo, this.idVideo).subscribe((resp: UploadVideo) => {
      this.aula = resp;
      if (!this.aula.linkVideo.includes('mkv')) {
        this.naoTemVideo = true;
        // alert("Não existe video para essa aula!")
      }else{
        this.naoTemVideo = false;
      }
    });
   }
   
  }

  findAllAulas() {
    this.moduloService.getAllAulas().subscribe((resp: UploadVideo[]) => {
      this.listaAulas = resp;
      this.qtdAulas = resp.length;
    });
  }

  velociadade(valor: number) {
    var myVideo: any = document.getElementById('myVideo');
    myVideo.playbackRate = valor;
  }

  play() {

    let video: any = document.getElementById('myVideo');


    if (video.paused) {
      this.playVideo = true;
      video.play();
    } else {
      this.playVideo = false;
      video.pause();
    }
  }

  respQuest() {


    if (!this.trilha) {
    this.barometro = false;
  }else{
    this.router.navigate(['/conteudo-um', Number(this.aula.num_sequencia) + 1]);
  }
    
  }

  ultimaAula() {
    this.alertService.showAlertDanger('Você já assistiu todas as aulas liberadas!')
  }

  proxAula() {
    if (this.modulo.aulas.length == this.aula.num_sequencia) {
      if (environment.respQuestVideo == false) {
        this.alertService.showAlertDanger('Responda a questão corretamente antes de finalizar!')

      } else {
        this.postAulaOk()
        this.alertService.showAlertInfo('Você já assistiu todas as aulas liberadas!')
        this.router.navigate(['/blocos'])
      }
    } else if (environment.respQuestVideo == false || environment.respQuestVideo == null) {
      this.alertService.showAlertDanger('Responda a questão corretamente antes de avançar!')
    } else {
        this.postAulaOk()
    }
  }

  postAulaOk(){
    this.atividadeRevisao = new QuestAulaValid()
    
    this.user.id = this.idUsuario
    this.atividadeRevisao.usuario = this.user

    this.aula.id = environment.idAula
    this.atividadeRevisao.aula = this.aula

    this.atividadeRevisao.respondido = true
    this.atividadeRevisao.usuario.turma = null;
    this.atividadeRevisao.usuario.usuario = null;
    this.atividadeRevisao.aula.modulo = null;
    this.atividadeRevisao.aula.questao = null;
    this.atividadesRevisaoService.postRespAtividade(this.atividadeRevisao).subscribe((resp: QuestAulaValid) => {
      this.atividadeRevisao = resp

    })
    this.router.navigate(['/conteudo-um', Number(this.aula.num_sequencia) + 1]);
  }

  assistaTudo() {
    if (!this.trilha) {
      this.alertService.showAlertDanger('Assita o video todo antes de ir para a próxima aula!')
    }else{
      this.router.navigate(['/conteudo-um', Number(this.aula.num_sequencia) + 1]);
    }
    
  }




}
