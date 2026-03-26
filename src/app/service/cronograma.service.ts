import { CronogramaCor } from './../model/CronogramaCor';
import { Cronograma } from './../model/Cronograma';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  getByIdCor(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ id, rgb: '#3B82F6', nome: 'Azul' }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/cor/${id}`, this.token);
  }

  getAllCor(): Observable<any> {
    if (environment.useMockServices) {
      return of([
        { id: 1, rgb: '#3B82F6', nome: 'Azul' },
        { id: 2, rgb: '#22C55E', nome: 'Verde' },
        { id: 3, rgb: '#EF4444', nome: 'Vermelho' }
      ]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/cor`, this.token);
  }

  postCor(cor: CronogramaCor): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...cor, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/cor`, cor, this.token);
  }

  postAgenda(agenda: Cronograma): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...agenda, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/agenda`, agenda, this.token);
  }

  getAllAgenda(): Observable<any> {
    if (environment.useMockServices) {
      const eventos: Cronograma[] = [
        {
          id: 1,
          descricao: 'Abertura do módulo',
          corRGB: { id: 1, rgb: '#3B82F6', nome: 'Azul' },
          date: '2026-03-25',
          inicio: '09:00',
          fim: '11:00',
          turma: { id: 1, descricao: 'Turma A' } as any,
          link: 'https://meet.example.com/aula-1'
        }
      ];
      return of(eventos).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/agenda`, this.token);
  }

  putAgenda(agenda: Cronograma): Observable<any> {
    if (environment.useMockServices) {
      return of(agenda).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/agenda`, agenda, this.token);
  }

  getByIdAgenda(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({
        id,
        descricao: 'Evento mock',
        corRGB: { id: 1, rgb: '#3B82F6', nome: 'Azul' },
        date: '2026-03-25',
        inicio: '09:00',
        fim: '11:00',
        turma: { id: 1, descricao: 'Turma A' },
        link: 'https://meet.example.com/mock'
      }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/agenda/${id}`, this.token);
  }

  deleteAgenda(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ deleted: true, id }).pipe(delay(500));
    }
    return this.http.delete(`${environment.server}${environment.port}/agenda/${id}`, this.token);
  }

  getByIdTurma(idTurma: number): Observable<any> {
    if (environment.useMockServices) {
      return this.getAllAgenda();
    }
    return this.http.get(`${environment.server}${environment.port}/agenda/turma/${idTurma}`, this.token);
  }

}
