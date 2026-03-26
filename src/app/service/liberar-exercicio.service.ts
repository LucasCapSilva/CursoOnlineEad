import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiberarExercicioService {

  constructor(private http: HttpClient) { }

  private simulateDelay = 300

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  getAllModulo() {
    if (environment.useMockServices) {
      return of([
        { id: 1, descricao: 'Angular Base' },
        { id: 2, descricao: 'Angular Intermediário' },
        { id: 3, descricao: 'Back-end' },
        { id: 4, descricao: 'Projeto' }
      ]).pipe(delay(this.simulateDelay));
    }
    return this.http.get(`${environment.server}${environment.port}/modulo`, this.token);
  }

  getAllModuloCombo() {
    if (environment.useMockServices) {
      return this.getAllModulo();
    }
    return this.http.get(`${environment.server}${environment.port}/modulo/By-Combo`, this.token)
  }

  getByIdModulo(id: number) {
    if (environment.useMockServices) {
      return of({ id, descricao: `Módulo ${id}` }).pipe(delay(this.simulateDelay));
    }
    return this.http.get(`${environment.server}${environment.port}/modulo/${id}`, this.token);
  }
}
