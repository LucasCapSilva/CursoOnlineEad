import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Turma } from '../model/Tuma';
import { User } from '../model/User';

import { UserPendnteDTO } from '../model/UserPendenteDTO';
import { AuthService } from '../service/auth.service';
import { LiberarAulasService } from '../service/liberar-aulas.service';
import { UserPendenteService } from '../service/user-pendente.service';

import { AlertModelService } from '../shared/alert-model.service';



@Component({
  selector: 'app-user-pendente',
  templateUrl: './user-pendente.component.html',
  styleUrls: ['./user-pendente.component.css']
})
export class UserPendenteComponent implements OnInit {
  listaTurma: Turma[];
  turmaId: number;
  id: number;
  idTurma: number;
  listaUser: any[] = [];

 
  turma: Turma = new Turma();
  carregando: boolean = false

  constructor(

    public auth: AuthService,
    public userPendenteService: UserPendenteService,
    public aulaLiberadaService: LiberarAulasService,
    public route: ActivatedRoute,
    private alertService: AlertModelService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.idTurma = this.route.snapshot.params['idTurma'];
    this.turma.id = this.id
    this.enviarEmail()
    this.findAllTurma()

  }

  findAllTurma() {
    this.listaTurma = [];
    this.aulaLiberadaService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      this.listaTurma = resp

    });
  }

  enviarEmail() {
    if (this.idTurma != 0) {
      this.userPendenteService.sendEmailByTurmaId(this.idTurma).subscribe((resp: any) => {
        this.listaUser = resp;
        this.turmaId = this.turma.id;
        this.carregando = false;
      });
    }
  }
}


