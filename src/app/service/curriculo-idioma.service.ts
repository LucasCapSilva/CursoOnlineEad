import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CurriculoIdioma } from '../model/CurriculoIdioma';

@Injectable({
  providedIn: 'root'
})
export class CurriculoIdiomaService {

  BaseUrl: string = `${environment.server}${environment.port}/CurriculoIdioma`

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  }
  getAllCurriculoIdioma(): Observable<CurriculoIdioma[]>{
    return this.http.get<CurriculoIdioma[]>(this.BaseUrl, this.token);
  }
  postCurriculoIdioma(curriculoIdioma: CurriculoIdioma): Observable <CurriculoIdioma>{
    return this.http.post<CurriculoIdioma>(`${this.BaseUrl}`, curriculoIdioma, this.token)
  }
  putCurriculoIdioma(curriculoIdioma: CurriculoIdioma): Observable <CurriculoIdioma>{
    return this.http.put<CurriculoIdioma>(`${this.BaseUrl}`, curriculoIdioma, this.token)
  }

  deleteCurriculoIdioma(id: number): Observable <void>{
    return this.http.delete<void>(`${this.BaseUrl}/${id}`,this.token)
  }

  postAllCurriculoIdioma(curriculoIdioma: CurriculoIdioma[]): Observable <CurriculoIdioma[]>{
    return this.http.post<CurriculoIdioma[]>(`${this.BaseUrl}/All`, curriculoIdioma, this.token)
  }

  putAllCurriculoIdioma(curriculoIdioma: CurriculoIdioma[]): Observable <CurriculoIdioma[]>{
    return this.http.put<CurriculoIdioma[]>(`${this.BaseUrl}/All`, curriculoIdioma, this.token)
  }
}
