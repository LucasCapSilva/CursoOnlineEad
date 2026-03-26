import { Aulas } from './../model/Aulas';
import { Trilha } from './../model/Trilha';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    if (environment.useMockServices) {
      const mockAulas: Aulas[] = [
        {
          id: 1,
          titulo: 'Introdução ao Angular',
          descricao: 'Conceitos básicos do framework Angular',
          linkVideo: 'https://www.youtube.com/watch?v=video1',
          linkDocumentacao: 'https://angular.io/docs',
          num_sequencia: 1,
          ativo: true,
          trilha: { id: 1, descricao: 'Frontend' } as Trilha
        },
        {
          id: 2,
          titulo: 'Componentes Angular',
          descricao: 'Criando e usando componentes',
          linkVideo: 'https://www.youtube.com/watch?v=video2',
          linkDocumentacao: 'https://angular.io/guide/component-overview',
          num_sequencia: 2,
          ativo: true,
          trilha: { id: 1, descricao: 'Frontend' } as Trilha
        },
        {
          id: 3,
          titulo: 'Services e HTTP',
          descricao: 'Consumindo APIs com serviços',
          linkVideo: 'https://www.youtube.com/watch?v=video3',
          linkDocumentacao: 'https://angular.io/guide/http',
          num_sequencia: 3,
          ativo: true,
          trilha: { id: 1, descricao: 'Frontend' } as Trilha
        }
      ];
      return of(mockAulas).pipe(delay(500));
    } else {
      return this.http.get(`http://93.188.161.223:9002/aulas`);
    }
  }

  getById(id: number): Observable<any> {
    if (environment.useMockServices) {
      const mockAulas: Aulas[] = [
        {
          id: 1,
          titulo: 'Introdução ao Angular',
          descricao: 'Conceitos básicos do framework Angular',
          linkVideo: 'https://www.youtube.com/watch?v=video1',
          linkDocumentacao: 'https://angular.io/docs',
          num_sequencia: 1,
          ativo: true,
          trilha: { id: 1, descricao: 'Frontend' } as Trilha
        }
      ];
      const aula = mockAulas.find(a => a.id === id);
      if (aula) {
        return of(aula).pipe(delay(500));
      } else {
        return new Observable(subscriber => {
          subscriber.error({ error: 'Aula não encontrada' });
        }).pipe(delay(500));
      }
    } else {
      return this.http.get(`http://93.188.161.223:9002/aulas/${id}`);
    }
  }

  getByIdModulo(idModulo: number, idVideo: number): Observable<any> {
    if (environment.useMockServices) {
      const mockAulas: Aulas[] = [
        {
          id: 1,
          titulo: 'Introdução ao Angular',
          descricao: 'Conceitos básicos do framework Angular',
          linkVideo: 'https://www.youtube.com/watch?v=video1',
          linkDocumentacao: 'https://angular.io/docs',
          num_sequencia: 1,
          ativo: true,
          trilha: { id: 1, descricao: 'Frontend' } as Trilha
        },
        {
          id: 2,
          titulo: 'Componentes Angular',
          descricao: 'Criando e usando componentes',
          linkVideo: 'https://www.youtube.com/watch?v=video2',
          linkDocumentacao: 'https://angular.io/guide/component-overview',
          num_sequencia: 2,
          ativo: true,
          trilha: { id: 1, descricao: 'Frontend' } as Trilha
        }
      ];
      const aulas = mockAulas.filter(a => a.num_sequencia === idModulo);
      return of(aulas).pipe(delay(500));
    } else {
      return this.http.get(`http://93.188.161.223:9002/aulas/trilha/${idModulo}/${idVideo}`);
    }
  }

  post(aulas: Aulas): Observable<any> {
    if (environment.useMockServices) {
      return of({ message: 'Aula criada com sucesso', id: Date.now() }).pipe(delay(500));
    } else {
      return this.http.post(`http://93.188.161.223:9002/aulas`, aulas);
    }
  }

}
