import { Chamada } from './../model/Chamada';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChamadaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  };

  getChamada(idTurma: number, data: string): Observable<any> {
    if (environment.useMockServices) {
      const chamadas: Chamada[] = [
        { id: 1, nome: 'João Silva', data, totalLogado: new Date(), status: 'PRESENTE' },
        { id: 2, nome: 'Maria Santos', data, totalLogado: new Date(), status: 'AUSENTE' }
      ];
      return of(chamadas).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/presenca/chamada?idTurma=${idTurma}&data=${data}`, this.token);
  }

  entradaChamada(idUser: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ ok: true, idUser, acao: 'entrada' }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/presenca/entrada/${idUser}` , this.token);
  }

  saidaChamada(idUser: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ ok: true, idUser, acao: 'saida' }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/presenca/saida/${idUser}` , this.token);
  }

  getByIdTurma(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ id, descricao: `Turma ${id}` }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/${id}`, this.token);
  }

  getAllTurma(): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, descricao: 'Turma A' }, { id: 2, descricao: 'Turma B' }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma`, this.token);
  }

}
