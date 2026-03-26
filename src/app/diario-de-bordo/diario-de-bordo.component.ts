import { Component, OnInit } from '@angular/core';
import { LiberarAulasService } from '../service/liberar-aulas.service';
import { User } from '../model/User';
import { Turma } from '../model/Tuma';
import { UserService } from '../service/user.service';
import { RelatorioBarometroDiaService } from '../service/relatorio-barometro-dia.service';

@Component({
  selector: 'app-diario-de-bordo',
  templateUrl: './diario-de-bordo.component.html',
  styleUrls: ['./diario-de-bordo.component.css']
})
export class DiarioDeBordoComponent implements OnInit {

  idUser : number;
  listaTurma: Turma[];
  // atributos para busca especifica de curriculo
  turma: Turma = new Turma();
  user: User = new User()
  listaUser: User[]
  idUsuario: number
  idTurma: number;
  constructor(
    public aulaLiberadaService: LiberarAulasService,
    private relatorioDiaService: RelatorioBarometroDiaService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.idTurma = 4
    this.findAllTurma()
    this. findByIdTurma()
  }

  findAllTurma() {
    this.listaTurma = []
    this.aulaLiberadaService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      this.listaTurma = resp
      });
  }
  findByIdTurma() {
    this.relatorioDiaService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
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

}
