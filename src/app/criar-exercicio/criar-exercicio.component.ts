import { AtividadeLiberada } from './../model/AtividadeLiberada';
import { AtividadeObrigatoria } from './../model/AtividadeObrigatoria';
import { AtividadesObrigatoriasService } from './../service/atividades-obrigatorias.service';
import { LiberarExercicioService } from './../service/liberar-exercicio.service';
import { Modulo } from './../model/Modulo';
import { LiberarAulasService } from './../service/liberar-aulas.service';
import { ExcelDownloadService } from './../service/excel-download.service';
import { User } from './../model/User';
import { Entregas } from './../model/Entregas';
import { AtividadeService } from './../service/atividade.service';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { Atividade } from './../model/Atividade';
import { Turma } from './../model/Tuma';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';

@Component({
  selector: 'app-criar-exercicio',
  templateUrl: './criar-exercicio.component.html',
  styleUrls: ['./criar-exercicio.component.css']
})
export class CriarExercicioComponent implements OnInit {
  idTurma: number;
  idEntrega:number;
  idTurmaListar: number;
  idAtividadeLista:number;
  idCurso: number;
  habilitarModulo:boolean = false;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  atividade: Atividade = new Atividade();
  listaAtividade: Atividade[];
  entrega:any;
  entregas: Entregas = new Entregas();
  listaEntregas: Entregas[];
  user: User = new User();
  key = 'data';
  reverse = true;
  delOk: boolean;
  listaEntregaExcel: any[] = [];
  page = 1;

  listaModulos: Modulo[]
  modulo: Modulo = new Modulo()
  idModulo: number

  listaExercLiberado = []
  listaExercBloqueado = []

  atividadeObrigatoria: AtividadeLiberada = new AtividadeLiberada()
  listaAtividadeObrigatoriaBloq: AtividadeLiberada[] = []
  listaAtividadeObrigatoriaLib: AtividadeLiberada[] = []

  listaAtivLib:AtividadeLiberada[] = []
  listaAtivBloq:AtividadeLiberada[] = []

  atividadeOb : AtividadeObrigatoria = new AtividadeObrigatoria()
  listaAtividadeObLib: AtividadeObrigatoria[]

  constructor(
    private alertService: AlertModelService,
    private router: Router,
    private excelService: ExcelDownloadService,
    private atividadeService: AtividadeService,
    private exercLiberadoService: LiberarExercicioService,
    private atividadeObrigatoriaService: AtividadesObrigatoriasService,
    private aulaLiberadaService: LiberarAulasService
  ) { }

  ngOnInit() {

    this.findAllTurma();

    window.scroll(0, 0);

    environment.titulo = 'Exercícios'
    environment.icon = 'pencil'

    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertService.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

  }

  scroll() {
    window.scroll(0, 0);
  }

  titulos(nome: string, icone: string){
    environment.titulo = nome
    environment.icon = icone
  }


deletarEntrega(){
  this.atividadeObrigatoriaService.deletetByIdEntregaObg(this.idEntrega).subscribe((resp: any) => {
    this.entrega = resp;
    this.listaAtividadeObLib = []
    this.listaEntregas = []
    this.alertService.showAlertSuccess('entrega deletada com sucesso!');
  });
}  

pegarIdEntrega(id:number){
this.idEntrega = id;
console.log("idEntrega: "+this.idEntrega)
this.atividadeObrigatoriaService.getByIdEntregaObg(this.idEntrega).subscribe((resp: any) => {
  this.entrega = resp;
})
console.log("entrega: "+JSON.stringify(this.entrega));
}

  findByIdTurma() {
    this.atividadeService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
      this.idCurso = this.turma.curso.id;
      this.findModuloByIdCurso()
      this.habilitarModulo = true;
    });
  }

  findModuloByIdCurso() {
    this.aulaLiberadaService.getModuloByIdCurso(this.idCurso).subscribe((resp: Modulo[]) =>{
      this.listaModulos = resp;
    
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.atividadeService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

  findAllModulo() {
    this.listaModulos = []
    this.exercLiberadoService.getAllModuloCombo().subscribe((resp: Modulo[]) => {
      resp.forEach(modulo =>{
        if(modulo.descricao != 'Deletados'){
          this.listaModulos.push(modulo)
        }
      })
    });
  }

  findByIdModulo() {
    this.exercLiberadoService.getByIdModulo(this.idModulo).subscribe((resp: Modulo) => {
      this.modulo = resp;
    });
  }

  listar(){
    this.findAllByIdTurmaBloqueada()
    this.findAllByIdTurmaLiberado()
  }

  findAllByIdTurmaLiberado() {
    this.atividadeObrigatoriaService.getAllByAtividadeLiberada(this.idTurma, this.idModulo).subscribe((resp: AtividadeLiberada[]) => {
      this.listaAtividadeObrigatoriaLib = resp;
    }, err => {
      
    });
  }

  findAllByIdTurmaLiberadoLista() {
    this.atividadeObrigatoriaService.getAllByAtividadeLiberadaLista(this.idTurma, this.idModulo).subscribe((resp: AtividadeObrigatoria[]) => {
      this.listaAtividadeObLib = resp;
      if(this.listaAtividadeObLib.length == 0){
        this.alertService.showAlertInfo('Não existem exercícios liberados, para essa turma e módulo.')
      }
  

    }, err => {
     
    });
  }

  findAllByIdTurmaBloqueada() {
    this.atividadeObrigatoriaService.getAllByAtividadeNaoLiberada(this.idTurma, this.idModulo).subscribe((resp: AtividadeLiberada[]) => {
      this.listaAtividadeObrigatoriaBloq = resp;
    });
  }

  pushArrayBloq(bloq) {
    if (bloq.check) {
      bloq.liberar = true;
      this.listaAtivBloq.push(bloq);
    }
    if (!bloq.check) {
      bloq.liberar = false;
      this.listaAtivBloq.splice(this.listaAtivBloq.indexOf(bloq), 1);
    }
  }

  pushArrayLib(lib) {
    if (lib.check) {
      lib.liberar = false;
      this.listaAtivLib.push(lib);
    }
    if (!lib.check) {
      lib.liberar = true;
      this.listaAtivLib.splice(this.listaAtivLib.indexOf(lib), 1);
    }
  }

  liberar() {
    this.listaAtivBloq.forEach((i) =>{
      i.atividade.modulo = null;
      i.turma.tipoTurma = null;
      i.turma.curso = null;
    })
    this.atividadeObrigatoriaService.putLiberarAtividade(this.listaAtivBloq).subscribe((resp: AtividadeLiberada[]) => {
      this.listaAtivLib = resp;
      this.listaAtivBloq = [];
      this.listar();
    });
  }

  bloquear() {
    this.listaAtivLib.forEach((i) =>{
      i.atividade.modulo = null;
      i.turma.tipoTurma = null;
      i.turma.curso = null;
    })
    this.atividadeObrigatoriaService.putLiberarAtividade(this.listaAtivLib).subscribe((resp: AtividadeLiberada[]) => {
      this.listaAtivBloq = resp;
      this.listaAtivLib = [];
      this.listar();
    });
  }


  publicar() {
    this.atividade.turma = new Turma()
    this.atividade.turma.id = this.idTurma;
    this.atividadeService.postAtividade(this.atividade).subscribe((resp: Atividade) => {
      this.atividade = resp;
      this.findAllAtividadesByTurma();
      this.alertService.showAlertSuccess('Exercício postado com sucesso!');
      this.atividade = new Atividade();
    });
  }

  findAllAtividadesByTurma() {
    document.getElementById('carregando').innerHTML = 'Carregando Exercícios...'
    this.atividadeService.getAtividadeByTurma(this.idTurmaListar).subscribe((resp: Atividade[]) => {
      this.listaAtividade = resp;
      document.getElementById('carregando').innerHTML = ''
    });
  }

  onDeleteAtividade(item) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Deseja realmente apagar esse exercício?', 'Sim', 'Não');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.atividadeService.deleteAtividade(item.id) : EMPTY)
      ).subscribe(() => {
        this.delOk = true;
        this.deleteOk();
        this.findAllAtividadesByTurma();
      }, err => {
        
      });
  }

  deleteOk() {
    this.alertService.showAlertSuccess('Exercício apagado com sucesso!');
}

  // findAllEntregas() {
  //   this.atividadeService.getAllEntregas().subscribe((resp: Entregas[]) => {
  //     this.listaEntregas = resp;
  //   });
  // }

  exportarExcel(idAtividade: number) {
    
    this.atividadeService.getAllEntregasByIdTurmaByIdAtividade(this.idTurma,idAtividade).subscribe((resp: Entregas[]) => {
      this.listaEntregas = resp;
      this.listaEntregas.map((item)=>{
        this.listaEntregaExcel.push({
          nome: item.usuario.nome,
          link: item.linkEntrega,
          observacoes: item.observacoes,
          data: item.dataEntrega,
          atraso: item.atraso
        })
      })
     
        this.excelService.exportAsExcelFile(this.listaEntregaExcel, 'Lista de entregas da atividade: ' + this.atividade.titulo + ', turma: ' + this.turma.descricao)
    })
    
   
  }



 

}
