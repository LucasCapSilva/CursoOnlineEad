import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { GithubParticipante } from '../model/GithubParticipante';
import { User } from '../model/User';
import { GithubParticipanteService } from '../service/github-participante.service';
import { AlertModelService } from '../shared/alert-model.service';

@Component({
  selector: 'app-github-participante',
  templateUrl: './github-participante.component.html',
  styleUrls: ['./github-participante.component.css']
})
export class GithubParticipanteComponent implements OnInit {

  nome = environment.nome

  idUser = environment.idUsuario

  githubParticipante: GithubParticipante = new GithubParticipante()
  usuario: User = new User()

  
  
  constructor(
    private alertService: AlertModelService,
    private router: Router,
    private githubService: GithubParticipanteService,
    private usuarioService: UserService
  ) { }
  
  ngOnInit() {
    window.scroll(0, 0);
    
    const token = environment.token
    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.getUsuarioByID()

  }

  getUsuarioByID(){
    this.usuarioService.getUserById(this.idUser).subscribe((resp: User) => {
      this.usuario = resp
    })
  }

  async cadastrarGithubParticipante() {
    this.usuario.id = this.idUser
    this.githubParticipante.user = this.usuario
    var re = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))")
    if (re.test(this.githubParticipante.userGithub)) {
      this.alertService.showAlertDanger("Coloque o seu nick do github! e não um link!")
    }else{
      await this.githubService.getGithubApi(this.githubParticipante.userGithub).subscribe((resp: any) => {  
        this.githubService.postGithub(this.githubParticipante).subscribe((resp: GithubParticipante) => {
          this.githubParticipante = resp;
          this.alertService.showAlertSuccess("Conta do github cadastrada com sucesso!")
          this.router.navigate(['/home'])
        })
        
      },err=>{
        this.alertService.showAlertDanger("cadastre um nick do github valido!")
      })
    }  
  }
}
