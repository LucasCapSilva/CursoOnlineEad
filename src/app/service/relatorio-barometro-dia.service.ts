import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RelatorioBarometroDiaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  private mockTurmas = [
    { id: 1, descricao: 'Turma A' },
    { id: 2, descricao: 'Turma B' },
    { id: 4, descricao: 'Turma C' },
    { id: 8, descricao: 'Ex-Participantes' }
  ];

  private mockBarometroDiario = [
    {
      id: 1,
      data: new Date('2026-03-24'),
      usuario: { id: 1, nome: 'João Silva', turma: { id: 1, descricao: 'Turma A' } },
      turma: { id: 1, descricao: 'Turma A' },
      score: 9,
      cor: 'VERDE'
    },
    {
      id: 2,
      data: new Date('2026-03-24'),
      usuario: { id: 2, nome: 'Maria Santos', turma: { id: 1, descricao: 'Turma A' } },
      turma: { id: 1, descricao: 'Turma A' },
      score: 7,
      cor: 'AMARELO'
    },
    {
      id: 3,
      data: new Date('2026-03-24'),
      usuario: { id: 3, nome: 'Pedro Oliveira', turma: { id: 2, descricao: 'Turma B' } },
      turma: { id: 2, descricao: 'Turma B' },
      score: 4,
      cor: 'VERMELHO'
    }
  ];

  getAllBarometroDiario() {
    if (environment.useMockServices) {
      return of(this.mockBarometroDiario).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/barometrodia`, this.token);
  }

  getByIdBarometroDiario(id: number) {
    if (environment.useMockServices) {
      const item = this.mockBarometroDiario.find(barometro => barometro.id === id) || this.mockBarometroDiario[0];
      return of(item).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/barometrodia/${id}`, this.token);
  }

  getByFilterDiario(nome?: string, idTurma?: number, cor?: string, dataIn?: string, dataFim?: string) {

    if (nome == undefined) {
      nome = '';
    }
    if (cor == undefined) {
      cor = '';
    }
    if (dataIn == undefined) {
      dataIn = '';
    }
    if (dataFim == undefined) {
      dataFim = '';
    }
    if (idTurma == undefined) {
      idTurma = 0;
    }

    if (environment.useMockServices) {
      const result = this.mockBarometroDiario.filter(item => {
        const byNome = !nome || item.usuario.nome.toLowerCase().includes(nome.toLowerCase());
        const byCor = !cor || item.cor.toLowerCase() === cor.toLowerCase();
        const byTurma = !idTurma || item.turma.id === idTurma;
        return byNome && byCor && byTurma;
      });
      return of(result).pipe(delay(500));
    }

    return this.http.get(`${environment.server}${environment.port}/barometrodia/filter?cor=${cor}&nome=${nome}&dataIn=${dataIn}&dataFim=${dataFim}&idTurma=${idTurma}`, this.token);
  }

  getByIdTurma(id: number) {
    if (environment.useMockServices) {
      const turma = this.mockTurmas.find(item => item.id === id) || { id, descricao: `Turma ${id}` };
      return of(turma).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/${id}`, this.token);
  }

  getAllTurma() {
    if (environment.useMockServices) {
      return of(this.mockTurmas).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/`, this.token);
  }

  getAllTurmaCombo(){
    if (environment.useMockServices) {
      return of(this.mockTurmas).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/By-Combo`, this.token)
  }
}
