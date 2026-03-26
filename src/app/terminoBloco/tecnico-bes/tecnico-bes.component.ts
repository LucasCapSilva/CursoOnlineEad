import { LiberarAulasService } from './../../service/liberar-aulas.service';
import { Turma } from './../../model/Tuma';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-bes',
  templateUrl: './tecnico-bes.component.html',
  styleUrls: ['./tecnico-bes.component.css']
})
export class TecnicoBESComponent implements OnInit {
  listaTurma: Turma[];
  idCurso: number;
  idTurma: number;
  turma: Turma = new Turma();
  constructor(
    private aulaLiberadaService: LiberarAulasService
  ) { }

  ngOnInit(): void {
    this.findAllTurma();
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

  findByIdTurma() {
    this.aulaLiberadaService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
      this.idCurso = this.turma.curso.id;
    });
  }

}
