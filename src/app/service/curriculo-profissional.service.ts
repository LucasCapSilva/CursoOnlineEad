import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CurriculoProfissional } from '../model/CurriculoProfissional';

@Injectable({
  providedIn: 'root'
})
export class CurriculoProfissionalService {

BaseUrl: string = `${environment.server}${environment.port}/CurriculoProfissional`

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  }
  getAllCurriculoProfissional(): Observable<CurriculoProfissional[]> {
    return this.http.get<CurriculoProfissional[]>(this.BaseUrl, this.token);
  }

  getByIdCurriculoProfissional(id: number): Observable<CurriculoProfissional> {
    return this.http.get<CurriculoProfissional>(`${this.BaseUrl}/${id}`, this.token);
  }


  postCurriculoProfissional(curriculoProfissional: CurriculoProfissional): Observable<CurriculoProfissional>{
    return this.http.post<CurriculoProfissional>(`${this.BaseUrl}`, curriculoProfissional, this.token)
  }

  putCurriculoProfissional(curriculoProfissional: CurriculoProfissional): Observable<CurriculoProfissional>{
    return this.http.put<CurriculoProfissional>(`${this.BaseUrl}`, curriculoProfissional, this.token)
  }

  deleteCurriculoProfissional(id: number): Observable <void>{
    return this.http.delete<void>(`${this.BaseUrl}/${id}`,this.token)
  }

  postAllCurriculoProfissional(curriculoProfissional: CurriculoProfissional[]): Observable<CurriculoProfissional[]>{
    return this.http.post<CurriculoProfissional[]>(`${this.BaseUrl}/All`, curriculoProfissional, this.token)
  }
  putAllCurriculoProfissional(curriculoProfissional: CurriculoProfissional[]): Observable <CurriculoProfissional[]>{
    return this.http.put<CurriculoProfissional[]>(`${this.BaseUrl}/All`, curriculoProfissional, this.token)
  }
}
