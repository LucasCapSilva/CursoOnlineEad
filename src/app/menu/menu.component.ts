import { GithubParticipanteService } from './../service/github-participante.service';
import { Curriculo } from 'src/app/model/Curriculo';
import { CurriculoService } from './../service/curriculo.service';
import { Turma } from './../model/Tuma';
import { RelatoriosService } from './../service/relatorios.service';
import { User } from './../model/User';
import { RegistroSaidaService } from './../service/registro-saida.service';
import { Chamada } from './../model/Chamada';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import jQuery from "jquery";
import { GithubParticipante } from '../model/GithubParticipante';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: User = new User();
  UserLogin: UserLogin;
  token: string;
  profile: string
  nome: string
  adm: boolean;
  idCurriculo: string;
  idUser = environment.idUsuario;
  chamada: Chamada = new Chamada();
  foto: any;
  curriculo: Curriculo = new Curriculo;
  turma: Turma = new Turma()
  github: GithubParticipante = new GithubParticipante()

  trilha = environment.trilha;

  constructor(
    private router: Router,
    public auth: AuthService,
    private saidaService: RegistroSaidaService,
    private relatorioService: RelatoriosService,
    private curriculoService: CurriculoService,
    private service: CurriculoService,
    public githubService: GithubParticipanteService

  ) { }

  ngOnInit() {

    this.getGithubPorUsuario()

    this.menuCollapse()

    this.adm = false;
    this.token = environment.token;
    this.nome = environment.nome


    this.findByIdTurma()
    this.findCurriculoIdioma(environment.idUsuario)
    let color = localStorage.getItem('color')
    document.getElementById('sidebar').style.setProperty('background-color', color, 'important')
    document.getElementById('navbarcontent').style.setProperty('background-color', color, 'important')
    document.getElementById('btn-bemestar').style.setProperty('background-color', color, 'important')

  }

  async findCurriculo(idUser:number,nome: string, icone: string){
    this.titulos(nome,icone)
    this.service.getByUserCurriculo(idUser).subscribe((resp: any)=>{
      this.curriculo = resp;
      environment.hasCurriculo = true;

      this.router.navigate(['/curriculo'])
        },err=>{
          if (err.status != 200) {
            environment.hasCurriculo = false
            this.router.navigate(['/curriculo']) 
          }
        }) 
      
    
  }

  findCurriculoIdioma(idUser:number){
    this.curriculoService.getByUserCurriculo(idUser).subscribe((resp: any)=>{
      this.idCurriculo = resp.id;
    
        }) 
  }

  sair() {
    this.saidaService.saidaChamada();
    environment.token = ""
    environment.nome = ""
    environment.profile = ""
    environment.idUsuario = 0
    environment.turma = ""
    environment.idTurma =  0
    environment.idCurso = 0
    environment.curso = ""
    environment.trilha = false
    environment.titulo = 'Inicio'
    environment.icon = 'home'
    document.location.reload();
  }

  titulos(nome: string, icone: string) {
    environment.titulo = nome
    environment.icon = icone
  }

  menuCollapse() {
    (function ($) {

      "use strict";

      var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
          $('.js-fullheight').css('height', $(window).height());
        });

      };
      fullHeight();

      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });

    })(jQuery);
  }

  findByIdTurma() {
    this.relatorioService.getByIdTurma(environment.idTurma).subscribe((resp: Turma) => {
      this.turma = resp
    })
  }


  changeColor(color: string) {
    localStorage.setItem('color', color)
    document.getElementById('sidebar').style.setProperty('background-color', color, 'important')
    document.getElementById('navbarcontent').style.setProperty('background-color', color, 'important')
    document.getElementById('btn-bemestar').style.setProperty('background-color', color, 'important')
  }

  getGithubPorUsuario(){
    this.githubService.getGithubByUserId(environment.idUsuario).subscribe((resp: GithubParticipante)=>{
      this.github = resp
    }, err => {
      this.github.userGithub = null
    })
  }

}
