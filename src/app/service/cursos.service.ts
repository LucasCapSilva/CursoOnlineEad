import { Curso } from './../model/Curso';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };


  getAllCursos(): Observable<any> {
    if (environment.useMockServices) {
      const cursos: Curso[] = [
        { id: 1, descricao: 'FullStack Java e React', modulos: { id: 1, descricao: 'Módulo 1', curso: 'FullStack Java e React', aulas: [] } },
        { id: 2, descricao: 'Data Science', modulos: { id: 2, descricao: 'Módulo 1', curso: 'Data Science', aulas: [] } },
        { id: 3, descricao: 'UX/UI Design', modulos: { id: 3, descricao: 'Módulo 1', curso: 'UX/UI Design', aulas: [] } }
      ];
      return of(cursos).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/curso`, this.token)
  }


  getAllCursosCombo(): Observable<any> {
    if (environment.useMockServices) {
      return this.getAllCursos();
    }
    return this.http.get(`${environment.server}${environment.port}/curso/By-Combo`, this.token)
  }

  getByIdCurso(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ id, descricao: `Curso ${id}`, modulos: { id: 1, descricao: 'Módulo 1', curso: `Curso ${id}`, aulas: [] } }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/curso/${id}`, this.token);
  }

  getCursoByName(nome: string): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, descricao: nome, modulos: { id: 1, descricao: 'Módulo 1', curso: nome, aulas: [] } }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/curso/name/${nome}`, this.token);
  }

  postTurma(curso: Curso): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...curso, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/curso`, curso, this.token)
  }

  putTurma(curso: Curso): Observable<any> {
    if (environment.useMockServices) {
      return of(curso).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/curso`, curso, this.token)
  }


}
