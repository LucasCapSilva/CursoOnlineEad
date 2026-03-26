import { Curso } from './../model/Curso';
import { AdmService } from './../service/adm.service';
import { ZoomService } from './../service/zoom.service';
import { TurmaService } from './../service/turma.service';
import { TipoTurma } from './../model/TipoTurma';
import { RelatoriosService } from './../service/relatorios.service';
import { environment } from './../../environments/environment.prod';
import { AlertModelService } from './../shared/alert-model.service';
import { AtividadeService } from './../service/atividade.service';
import { Turma } from './../model/Tuma';
import { UserLogin } from './../model/UserLogin';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { User } from '../model/User';
import { Component, OnInit, NgModule } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  user: User = new User();
  userList: User[]
  userListDois: User[]
  turma: Turma = new Turma()
  listaTurma: Turma []
  idTurma: number
  profile: string
  senha: string;
  email: string;
  curso:Curso;
  listCurso = []
  idCurso:number;
  tipoTurma: TipoTurma = new TipoTurma()
  listaTipoTuma: TipoTurma[]
  idTipoTurma: number

  willDownload = false;

  idUserSelect: number

  aguarde: boolean = true

  constructor(
    private authService: AuthService,
    private router: Router,
    private atividadeService: AtividadeService,
    private alertas: AlertModelService,
    private turmaService: TurmaService,
    private admService: AdmService
    ) { }

  ngOnInit() {

    this.findAllTurma()
    this.findAllTipoTurma()
    this.findAllCurso()
    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertas.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    const token = environment.token;

    if (token == '') {
      this.alertas.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
  }

  conferirSenha(event: any) {
    this.senha = event.target.value;
  }

  cadastroMassa(){
    this.aguarde = false
    document.getElementById('carregando').innerHTML = 'Aguarde, estamos cadastrando os usuários...'
    this.userList = []
    this.userListDois.forEach(user =>{
      this.turma.id = this.idTurma
      user.turma = this.turma
      user.turma.curso = null;
      this.userList.push(user)
    })
    this.authService.cadastroAll(this.userList).subscribe((resp: User[])=>{
      this.userList = resp
      this.aguarde = true
      document.getElementById('carregando').innerHTML = ''
      this.alertas.showAlertSuccess('Usuários cadastrados com sucesso!')
      this.router.navigate(['/home']);
    }, erro =>{
      if(erro.status == 400){
        document.getElementById('carregando').innerHTML = ''
          this.aguarde = true
          this.alertas.showAlertDanger('Algum usuário já existe.')
      }
      if(erro.status == 500){
          document.getElementById('carregando').innerHTML = ''
          this.aguarde = true
          this.alertas.showAlertDanger('Esse documento excel não é válido.')
      }
    })
  }

  cadastrar() {
    this.aguarde = false
    document.getElementById('carregando').innerHTML = 'Aguarde, estamos cadastrando o usuário...'
    this.user.profile = this.profile
    this.turma.id = this.idTurma
    this.user.turma = this.turma
    this.user.ativo = 1
    if(this.user.nome == undefined || this.user.password == undefined || this.user.profile == undefined || this.user.profile == 'Selecione um tipo de user:' || this.user.turma.id == undefined || this.user.usuario == undefined){
      this.alertas.showAlertDanger('Preencha todos os campos corretamente!')
      this.aguarde = true
      document.getElementById('carregando').innerHTML = ''
    } else {
      this.authService.cadastrar(this.user).subscribe((res: User) => {
        this.user = res;
        this.aguarde = true
        document.getElementById('carregando').innerHTML = ''
        this.alertas.showAlertSuccess('User cadastrado com sucesso!')
        this.router.navigate(['/home']);
       }, err => {
        if(err.status == 400){
          document.getElementById('carregando').innerHTML = ''
          this.aguarde = true
          this.alertas.showAlertDanger('Esse usuário já existe.')
        }
       });
    }
  }

    findByIdTurma() {
      this.atividadeService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
        this.turma = resp;
      });
    }

    findByIdCurso() {
      this.atividadeService.getByIdTurma(this.idCurso).subscribe((resp: Curso) => {
        this.curso = resp;
      });
    }

    findAllCurso() {
      this.admService.getAllCurso().subscribe((resp: any) => {
        resp.map(item =>{
          this.listCurso.push({"id":item.id,"descricao":item.descricao})
        });
      });
    }

    findAllTurma() {
      this.listaTurma = []
      this.atividadeService.getAllTurma().subscribe((resp: Turma[]) => {

        if(this.authService.programas()){
          resp.forEach(turmas =>{
            if(turmas.descricao != 'Instrutor' && turmas.descricao != 'Admin' && turmas.descricao != 'Turma Staff' && turmas.descricao != 'Ex-Participantes' && turmas.descricao != 'Programas' ){
              this.listaTurma.push(turmas)
            }
          })
        } else {
          this.listaTurma = resp
        }

      });
    }

    profileUser(event: any){
      this.profile = event.target.value
    }

    onFileChange(ev) {
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = ev.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);


          return initial;
        }, {});
        const dataString = JSON.stringify(jsonData);
        document.getElementById('output').innerHTML = file.name;
        // this.setDownload(dataString);
        const lista = JSON.parse(dataString)
        this.userListDois = []

        lista.Planilha1.forEach((user: User) => {
          this.userListDois.push(user)
        });
      }
      reader.readAsBinaryString(file);
    }

    // setDownload(data) {
    //   this.willDownload = true;
    //   setTimeout(() => {
    //     const el = document.querySelector("#download");
    //     el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
    //     el.setAttribute("download", 'xlsxtojson.json');
    //   }, 1000)
    // }

    findAllTipoTurma(){
      this.listaTipoTuma = []
      this.admService.getAllTipoTurma().subscribe((resp: TipoTurma[]) => {
        if(this.authService.programas()){
          resp.forEach(tipo =>{
            if(tipo.descricao != 'Admin' && tipo.descricao != 'Instrutor'){
              this.listaTipoTuma.push(tipo)
            }
          })
        } else {
          this.listaTipoTuma = resp
        }



      })
    }

    findByIdTipoTurma(){
      this.admService.getTipoTurmaById(this.idTipoTurma).subscribe((resp: TipoTurma)=>{
        this.tipoTurma = resp
     
      })
    }

    cadastrarTurma(){
      this.turma.tipoTurma = new TipoTurma();
      this.turma.tipoTurma.id = this.idTipoTurma
      this.curso.id = this.idCurso
      this.turma.curso = this.curso

      if(this.turma.tipoTurma != null || this.turma.curso != null || this.turma.descricao != null){
        this.admService.postTurma(this.turma).subscribe((resp: Turma)=>{
          this.turma = resp

          this.alertas.showAlertSuccess('Turma cadastrada com sucesso!')
        })
      } else {
        this.alertas.showAlertDanger('Preencha todos os campos antes de cadastrar')
      }
    }

}
