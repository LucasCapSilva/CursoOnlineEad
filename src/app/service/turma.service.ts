import { Turma } from './../model/Tuma';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  };


  getAllTipoTurma(): Observable<any> {
    if (environment.useMockServices) {
      const mockTipoTurma = [
        { id: 1, descricao: 'Presencial' },
        { id: 2, descricao: 'Online' },
        { id: 3, descricao: 'Híbrido' }
      ];
      return of(mockTipoTurma).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/tipoturma`, this.token);
    }
  }

  getTipoTurmaById(id: number): Observable<any> {
    if (environment.useMockServices) {
      const mockTipoTurma = [
        { id: 1, descricao: 'Presencial' },
        { id: 2, descricao: 'Online' },
        { id: 3, descricao: 'Híbrido' }
      ];
      const tipo = mockTipoTurma.find(t => t.id === id);
      if (tipo) {
        return of(tipo).pipe(delay(500));
      } else {
        return new Observable(subscriber => {
          subscriber.error({ error: 'Tipo de turma não encontrado' });
        }).pipe(delay(500));
      }
    } else {
      return this.http.get(`${environment.server}${environment.port}/tipoturma/${id}`, this.token);
    }
  }

  getByIdTurma(id: number): Observable<any> {
    if (environment.useMockServices) {
      const mockTurmas: Turma[] = [
        {
          id: 1,
          descricao: 'Turma A',
          tipoTurma: { id: 1, descricao: 'Presencial' } as any,
          users: [],
          curso: { id: 1, descricao: 'FullStack Java e React', modulos: { id: 1, descricao: 'Módulo 1', curso: 'FullStack Java e React', aulas: [] } }
        },
        {
          id: 2,
          descricao: 'Turma B',
          tipoTurma: { id: 2, descricao: 'Online' } as any,
          users: [],
          curso: { id: 2, descricao: 'Data Science', modulos: { id: 1, descricao: 'Módulo 1', curso: 'Data Science', aulas: [] } }
        }
      ];
      const turma = mockTurmas.find(t => t.id === id);
      if (turma) {
        return of(turma).pipe(delay(500));
      } else {
        return new Observable(subscriber => {
          subscriber.error({ error: 'Turma não encontrada' });
        }).pipe(delay(500));
      }
    } else {
      return this.http.get(`${environment.server}${environment.port}/turma/${id}`, this.token);
    }
  }

  getAllTurma(): Observable<any> {
    if (environment.useMockServices) {
      const mockTurmas: Turma[] = [
        {
          id: 1,
          descricao: 'Turma A',
          tipoTurma: { id: 1, descricao: 'Presencial' } as any,
          users: [],
          curso: { id: 1, descricao: 'FullStack Java e React', modulos: { id: 1, descricao: 'Módulo 1', curso: 'FullStack Java e React', aulas: [] } }
        },
        {
          id: 2,
          descricao: 'Turma B',
          tipoTurma: { id: 2, descricao: 'Online' } as any,
          users: [],
          curso: { id: 2, descricao: 'Data Science', modulos: { id: 1, descricao: 'Módulo 1', curso: 'Data Science', aulas: [] } }
        },
        {
          id: 3,
          descricao: 'Turma C',
          tipoTurma: { id: 3, descricao: 'Híbrido' } as any,
          users: [],
          curso: { id: 3, descricao: 'UX/UI Design', modulos: { id: 1, descricao: 'Módulo 1', curso: 'UX/UI Design', aulas: [] } }
        }
      ];
      return of(mockTurmas).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/turma`, this.token);
    }
  }

  postTurma(turma: Turma): Observable<any> {
    if (environment.useMockServices) {
      return of({ message: 'Turma criada com sucesso', id: Date.now() }).pipe(delay(500));
    } else {
      return this.http.post(`${environment.server}${environment.port}/turma`, turma, this.token);
    }
  }
}
