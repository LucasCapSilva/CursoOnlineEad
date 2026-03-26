import { AulaLiberada } from './../model/AulaLiberada';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiberarAulasService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  getAllByIdTurma(id: number, isLiberado: boolean, moduloId: number): Observable<any> {
    if (environment.useMockServices) {
      return of([
        { id: 1, isLiberado, modulo: { id: moduloId }, turma: { id }, aula: { id: 1, titulo: 'Aula 1' } },
        { id: 2, isLiberado, modulo: { id: moduloId }, turma: { id }, aula: { id: 2, titulo: 'Aula 2' } }
      ]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/liberaraula/turma/${id}/${isLiberado}/${moduloId}`, this.token);
  }

  getAllByIdTurmaByCombo(id: number, isLiberado: boolean, moduloId: number): Observable<any> {
    if (environment.useMockServices) {
      return this.getAllByIdTurma(id, isLiberado, moduloId);
    }
    return this.http.get(`${environment.server}${environment.port}/liberaraula/turma/${id}/${isLiberado}/${moduloId}/By-Combo`, this.token);
  }

  putLiberarAula(aula: AulaLiberada[]): Observable<any> {
    if (environment.useMockServices) {
      return of(aula).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/liberaraula/all`, aula, this.token);
  }

  //Módulo

  getAllModulo(): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, descricao: 'Módulo 1' }, { id: 2, descricao: 'Módulo 2' }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/modulo`, this.token);
  }

  getAllModuloCombo(): Observable<any> {
    if (environment.useMockServices) {
      return this.getAllModulo();
    }
    return this.http.get(`${environment.server}${environment.port}/modulo/By-Combo`, this.token)
  }


  getByIdModulo(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ id, descricao: `Módulo ${id}` }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/modulo/${id}`, this.token);
  }

  getModuloByIdCurso(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, descricao: 'Módulo 1', curso: { id } }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/modulo/curso/${id}`, this.token);
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
    return this.http.get(`${environment.server}${environment.port}/turma/`, this.token);
  }
  getAllTurmaCombo(): Observable<any> {
    if (environment.useMockServices) {
      return this.getAllTurma();
    }
    return this.http.get(`${environment.server}${environment.port}/turma/By-Combo`, this.token)
  }

}
