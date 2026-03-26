import { BarometroDiario } from './../model/BarometroDiario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BarometroDiarioService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  postBarometro(barometro: BarometroDiario): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...barometro, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/barometrodia`, barometro, this.token);
  }

  respostasBarometro(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ id, respondido: true }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/barometrodia/notification/${id}`, this.token)
  }


}
