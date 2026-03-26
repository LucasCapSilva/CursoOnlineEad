import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CurriculoPortifolio } from '../model/CurriculoPortifolio';

@Injectable({
  providedIn: 'root'
})
export class CurriculoPortifolioService {

  BaseUrl: string = `${environment.server}${environment.port}/CurriculoPortifolio`

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  }

  getAllCurriculoPortifolio(): Observable<CurriculoPortifolio[]> {
    return this.http.get<CurriculoPortifolio[]>(this.BaseUrl, this.token);
  }

  getByIdCurriculoPortifolio(id: number): Observable<CurriculoPortifolio> {
    return this.http.get<CurriculoPortifolio>(`${this.BaseUrl}/${id}`, this.token);
  }


  postCurriculoPortifolio(curriculoPortifolio: CurriculoPortifolio): Observable<CurriculoPortifolio>{
    return this.http.post<CurriculoPortifolio>(`${this.BaseUrl}`, curriculoPortifolio, this.token)
  }

  putCurriculoPortifolio(curriculoPortifolio: CurriculoPortifolio): Observable<CurriculoPortifolio>{
    return this.http.put<CurriculoPortifolio>(`${this.BaseUrl}`, curriculoPortifolio, this.token)
  }

  deleteCurriculoPortifolio(id: number): Observable <void>{
    return this.http.delete<void>(`${this.BaseUrl}/${id}`,this.token)
  }

  postAllCurriculoPortifolio(curriculoPortifolio: CurriculoPortifolio[]): Observable<CurriculoPortifolio[]>{
    return this.http.post<CurriculoPortifolio[]>(`${this.BaseUrl}/All`, curriculoPortifolio, this.token)
  }
  putAllCurriculoPortifolio(curriculoPortifolio: CurriculoPortifolio[]): Observable <CurriculoPortifolio[]>{
    return this.http.put<CurriculoPortifolio[]>(`${this.BaseUrl}/All`, curriculoPortifolio, this.token)
  }
}
