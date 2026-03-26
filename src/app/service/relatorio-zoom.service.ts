import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RelatorioZoomService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  private mockTurmas = [
    { id: 1, descricao: 'Turma A' },
    { id: 2, descricao: 'Turma B' },
    { id: 8, descricao: 'Ex-Participantes' }
  ];

  private mockPresencas = [
    { id: 1, user: 'João Silva', turma: 'Turma A', data: '2026-03-24', isPresente: true, qtd: 110 },
    { id: 2, user: 'Maria Santos', turma: 'Turma A', data: '2026-03-24', isPresente: true, qtd: 102 },
    { id: 3, user: 'Pedro Oliveira', turma: 'Turma B', data: '2026-03-24', isPresente: false, qtd: 0 }
  ];

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

  getEntradaById(idUser: number) {
    if (environment.useMockServices) {
      return of({ ok: true, idUser }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/presencazoom/entrada/${idUser}`, this.token);
  }

  getChamadaByIdTurmaByData(idTurma: number, data: string) {
    if (environment.useMockServices) {
      const turma = this.mockTurmas.find(item => item.id === idTurma);
      const turmaDescricao = turma ? turma.descricao : '';
      const filtrado = this.mockPresencas.filter(item => {
        const byTurma = !idTurma || item.turma === turmaDescricao;
        const byData = !data || item.data === data;
        return byTurma && byData;
      });
      return of(filtrado).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/presencazoom/chamada?idTurma=${idTurma}&data=${data}`, this.token);
  }
}
