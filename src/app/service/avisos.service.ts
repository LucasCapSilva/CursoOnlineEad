import { Avisos } from './../model/Avisos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

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
    return this.http.get(`${environment.server}${environment.port}/turma/`, this.token);
  }

  getAllAvisosByTurma(idTurma: number): Observable<any> {
    if (environment.useMockServices) {
      const avisos: Avisos[] = [
        {
          id: 1,
          data: '2026-03-25',
          user: { id: 2, nome: 'Maria Santos' } as any,
          turma: { id: 1, descricao: 'Turma A' } as any,
          titulo: 'Boas-vindas',
          texto: 'Bem-vindos ao módulo.',
          link: ''
        },
        {
          id: 2,
          data: '2026-03-26',
          user: { id: 1, nome: 'João Silva' } as any,
          turma: { id: 2, descricao: 'Turma B' } as any,
          titulo: 'Material complementar',
          texto: 'Confiram os links úteis.',
          link: 'https://angular.io/docs'
        }
      ];
      return of(avisos.filter(item => item.turma.id === idTurma)).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/mural/turma/${idTurma}`, this.token);
  }

  getAvisosById(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({
        id,
        data: '2026-03-25',
        user: { id: 2, nome: 'Maria Santos' },
        turma: { id: 1, descricao: 'Turma A' },
        titulo: 'Aviso mock',
        texto: 'Conteúdo mock',
        link: ''
      }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/mural/${id}`, this.token);
  }

  postAvisos(aviso: Avisos): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...aviso, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/mural/`, aviso, this.token);
  }

  puttAvisos(aviso: Avisos): Observable<any> {
    if (environment.useMockServices) {
      return of(aviso).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/mural/`, aviso, this.token);
  }

  deleteAvisos(idAviso: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ deleted: true, id: idAviso }).pipe(delay(500));
    }
    return this.http.delete(`${environment.server}${environment.port}/mural/${idAviso}`, this.token);
  }

  getByTituloAviso(titulo: string, idTurma: number): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, titulo, turma: { id: idTurma, descricao: 'Turma mock' }, texto: 'Resultado mock' }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/mural/titulo/${titulo}/${idTurma}`, this.token);
  }
}
