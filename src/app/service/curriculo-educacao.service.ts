import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CurriculoEducacao } from '../model/CurriculoEducacao';

@Injectable({
  providedIn: 'root'
})
export class CurriculoEducacaoService {

  BaseUrl: string = `${environment.server}${environment.port}/CurriculoEducacao`

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  }
  getAllCurriculoEducacao(): Observable<CurriculoEducacao[]>{
    return this.http.get<CurriculoEducacao[]>(this.BaseUrl, this.token);
  }
  postCurriculoEducacao(curriculoEducacao: CurriculoEducacao): Observable <CurriculoEducacao>{
    return this.http.post<CurriculoEducacao>(`${this.BaseUrl}`, curriculoEducacao, this.token)
  }
  putCurriculoEducacao(curriculoEducacao: CurriculoEducacao): Observable <CurriculoEducacao>{
    return this.http.put<CurriculoEducacao>(`${this.BaseUrl}`, curriculoEducacao, this.token)
  }
  deleteCurriculoEducacao(id: number): Observable <void>{
    return this.http.delete<void>(`${this.BaseUrl}/${id}`,this.token)
  }
  postAllCurriculoEducacao(curriculoEducacao: CurriculoEducacao[]): Observable<CurriculoEducacao[]>{
    return this.http.post<CurriculoEducacao[]>(`${this.BaseUrl}/All`, curriculoEducacao, this.token)
  }
  putAllCurriculoEducacao(curriculoEducacao: CurriculoEducacao[]): Observable <CurriculoEducacao[]>{
    return this.http.put<CurriculoEducacao[]>(`${this.BaseUrl}/All`, curriculoEducacao, this.token)
  }
}
