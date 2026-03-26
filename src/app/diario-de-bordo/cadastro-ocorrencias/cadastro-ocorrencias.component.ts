import { Component, OnInit } from '@angular/core';
import { Turma } from 'src/app/model/Tuma';
import { User } from 'src/app/model/User';
import { LiberarAulasService } from 'src/app/service/liberar-aulas.service';
import { RelatorioBarometroDiaService } from 'src/app/service/relatorio-barometro-dia.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cadastro-ocorrencias',
  templateUrl: './cadastro-ocorrencias.component.html',
  styleUrls: ['./cadastro-ocorrencias.component.css']
})
export class CadastroOcorrenciasComponent implements OnInit {
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
