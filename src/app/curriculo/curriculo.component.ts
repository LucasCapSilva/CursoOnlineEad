import { User } from './../model/User';
import { UserService } from './../service/user.service';
import { LiberarAulasService } from './../service/liberar-aulas.service';
import { Turma } from './../model/Tuma';
import { AuthService } from './../service/auth.service';
import { Curriculo } from './../model/Curriculo';
import { CurriculoService } from './../service/curriculo.service';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css']
})
export class CurriculoComponent implements OnInit {
  idUser : number;
  temCurriculo:boolean = false;
  listaTurma: Turma[];
  // atributos para busca especifica de curriculo
  turma: Turma = new Turma();
  user: User = new User()
  listaUser: User[]
  idUsuario: number
  idTurma: number;
  
  constructor(
    public curriculo: CurriculoService,
    public auth: AuthService,
    public aulaLiberadaService: LiberarAulasService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.idUser = environment.idUsuario;
    this.temCurriculo = this.curriculo.temCurriculo()
    this.findAllUser()
    this.findAllTurma()

  }
  // buscas especificas curriculo
  findAllTurma() {
    this.listaTurma = []
    this.aulaLiberadaService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      this.listaTurma = resp
      });
  }

  findByIdTurma() {
    this.aulaLiberadaService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
      this.idTurma = this.turma.id;
    });
  }
  
  findAllUser(){
    this.userService.getAllUsers().subscribe((resp: User[])=>{
      this.listaUser = resp
    })
  }

  findByIdUser(){
    this.userService.getUserById(this.idUsuario).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  titulo(nome: string, icon: string){
    environment.titulo = nome
    environment.icon = icon
  }

}
