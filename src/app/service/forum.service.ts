import { ForumComentario } from './../model/ForumComentario';
import { ForumDuvida } from './../model/ForumDuvida';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }
  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  //Dúvidas

  getAllDuvidas(): Observable<any> {
    if (environment.useMockServices) {
      const mockDuvidas: ForumDuvida[] = [
        {
          id: 1,
          titulo: 'Como usar serviços no Angular?',
          question: 'Tenho dúvida sobre injeção de dependência.',
          user: { id: 1, nome: 'João Silva' } as User,
          comment: [],
          data: new Date('2026-03-20')
        },
        {
          id: 2,
          titulo: 'Erro ao consumir API',
          question: 'Recebo 404 em uma rota local.',
          user: { id: 2, nome: 'Maria Santos' } as User,
          comment: [],
          data: new Date('2026-03-22')
        }
      ];
      return of(mockDuvidas).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/forumQuestions`, this.token);
  }

  getByIdDuvida(id: number): Observable<any> {
    if (environment.useMockServices) {
      return this.getAllDuvidas().pipe(delay(0));
    }
    return this.http.get(`${environment.server}${environment.port}/forumQuestions/${id}`, this.token);
  }

  postDuvida(duvida: ForumDuvida): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...duvida, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/forumQuestions`, duvida, this.token);
  }

  putDuvida(duvida: ForumDuvida): Observable<any> {
    if (environment.useMockServices) {
      return of(duvida).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/forumQuestions`, duvida, this.token);
  }

  deleteDuvida(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ deleted: true, id }).pipe(delay(500));
    }
    return this.http.delete(`${environment.server}${environment.port}/forumQuestions/${id}`, this.token);
  }

  getByTituloDuvida(titulo: string): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, titulo, question: 'Resultado mock', user: { id: 1, nome: 'João Silva' } as User, comment: [], data: new Date() }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/forumQuestions/titulo/${titulo}`, this.token);
  }

  //Comentários

  getAllComentarios(): Observable<any> {
    if (environment.useMockServices) {
      const mockComentarios: ForumComentario[] = [
        {
          id: 1,
          user: { id: 2, nome: 'Maria Santos' } as User,
          question: { id: 1, titulo: 'Como usar serviços no Angular?' } as ForumDuvida,
          comment: 'Você pode começar pelo @Injectable.',
          data: new Date('2026-03-23')
        }
      ];
      return of(mockComentarios).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/forumComment`, this.token);
  }

  getByIdComentario(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({
        id,
        user: { id: 2, nome: 'Maria Santos' } as User,
        question: { id: 1, titulo: 'Como usar serviços no Angular?' } as ForumDuvida,
        comment: 'Comentário mock',
        data: new Date()
      }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/forumComment/${id}`, this.token);
  }

  postComentario(comment: ForumComentario): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...comment, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/forumComment`, comment, this.token);
  }

  putComentario(comentario: ForumComentario): Observable<any> {
    if (environment.useMockServices) {
      return of(comentario).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/forumComment`, comentario, this.token);
  }

  deleteComentario(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ deleted: true, id }).pipe(delay(500));
    }
    return this.http.delete(`${environment.server}${environment.port}/forumComment/${id}`, this.token);
  }

}
