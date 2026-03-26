import { Modulo } from './../model/Modulo';
import { AulaLiberada } from './../model/AulaLiberada';
import { LiberarAulasService } from './../service/liberar-aulas.service';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { Turma } from './../model/Tuma';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { Aula } from '../model/Aula';

@Component({
  selector: 'app-liberar-aulas',
  templateUrl: './liberar-aulas.component.html',
  styleUrls: ['./liberar-aulas.component.css']
})
export class LiberarAulasComponent implements OnInit {

  listaAulasBloqueadas: AulaLiberada[];
  listarAulasLiberadas: AulaLiberada[];

  listaAulasBloq: AulaLiberada[] = [];
  listaAulasLib: AulaLiberada[] = [];
  idCurso: number;
  idTurma: number;
  habilitarModulo:boolean = false;
  turma: Turma = new Turma();
  listaTurma: Turma[];
  listaModulos: Modulo[];
  modulo: Modulo = new Modulo();
  idModulo: number;
  aula: AulaLiberada = new AulaLiberada();
  checado: any;

  constructor(
    private alertService: AlertModelService,
    private router: Router,
    private aulaLiberadaService: LiberarAulasService
    ) { }

  ngOnInit() {

    window.scroll(0, 0);

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

    this.findAllTurma();
 
  }

  findAllByIdTurmaLiberado() {
    this.aulaLiberadaService.getAllByIdTurmaByCombo(this.idTurma, true, this.idModulo).subscribe((resp: AulaLiberada[]) => {
      this.listarAulasLiberadas = resp;
    }, err => {
      
    });
  }

  findAllByIdTurmaBloqueada() {
    this.aulaLiberadaService.getAllByIdTurmaByCombo(this.idTurma, false, this.idModulo).subscribe((resp: AulaLiberada[]) => {
      this.listaAulasBloqueadas = resp;
    });
  }

  listar() {
    this.findAllByIdTurmaBloqueada();
    this.findAllByIdTurmaLiberado();
  }


  findByIdTurma() {
    this.aulaLiberadaService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
      this.idCurso = this.turma.curso.id;
      this.findModuloByIdCurso()
      this.habilitarModulo = true;
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.aulaLiberadaService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

  findAllModulo() {
    this.listaModulos =[]
    this.aulaLiberadaService.getAllModuloCombo().subscribe((resp: Modulo[]) => {
      resp.forEach(modulo =>{
        if(modulo.descricao != 'Deletados'){
          this.listaModulos.push(modulo)
        }
      })
    });
  }

  findByIdModulo() {
    this.aulaLiberadaService.getByIdModulo(this.idModulo).subscribe((resp: Modulo) => {
      this.modulo = resp;
    });
  }

  findModuloByIdCurso() {
    this.aulaLiberadaService.getModuloByIdCurso(this.idCurso).subscribe((resp: Modulo[]) =>{
      this.listaModulos = resp;
  
    });
  }
  

  pushArrayBloq(bloq) {
    if (bloq.check) {
      bloq.liberar = true;
      this.listaAulasBloq.push(bloq);
    }
    if (!bloq.check) {
      bloq.liberar = false;
      this.listaAulasBloq.splice(this.listaAulasBloq.indexOf(bloq), 1);
    }
  }

  pushArrayLib(lib) {
    if (lib.check) {
      lib.liberar = false;
      this.listaAulasLib.push(lib);
    }
    if (!lib.check) {
      lib.liberar = true;
      this.listaAulasLib.splice(this.listaAulasLib.indexOf(lib), 1);
    }
  }

  liberar() { 
    let listaBloq: any[] = []

    this.listaAulasBloq.forEach((i) => {
      let bloq = {
        id: 0,
        aula: {
          id: 0
        },
        liberar: false,
        turma: {
          id: 0
        }
      }

      bloq.aula.id = i.aula.id
      bloq.id = i.id
      bloq.liberar = i.liberar
      // i.turma.curso = null;
      bloq.turma = new Turma()
      bloq.turma.id = this.idTurma
      listaBloq.push(bloq)
    })
    
   
    this.aulaLiberadaService.putLiberarAula(listaBloq).subscribe((resp: AulaLiberada[]) => {
      this.listarAulasLiberadas = resp;
      this.listaAulasBloq = [];
      this.listar();
    }, err => {
     
    });
  }

  bloquear() {
    let listaLib: any[] = []

    this.listaAulasLib.forEach((i) => {
      let lib = {
        id: 0,
        aula: {
          id: 0
        },
        liberar: true,
        turma: {
          id: 0
        }
      }

      lib.aula.id = i.aula.id
      lib.id = i.id
      lib.liberar = i.liberar
      // i.turma.curso = null;
      lib.turma = new Turma()
      lib.turma.id = this.idTurma
      listaLib.push(lib)
    })
    
    this.aulaLiberadaService.putLiberarAula(listaLib).subscribe((resp: AulaLiberada[]) => {
      this.listaAulasBloqueadas = resp;
      this.listaAulasLib = [];
      this.listar();
    }, err => {
      
    });
  }


}
