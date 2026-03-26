import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CurriculoComportamentais } from '../model/CurriculoComportamentais';

@Injectable({
  providedIn: 'root'
})
export class CurriculoComportamentaisService {

  BaseUrl: string = `${environment.server}${environment.port}/CurriculoComportamentais`

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  }

  getAllCurriculoComportamentais(): Observable<CurriculoComportamentais[]>{
    return this.http.get<CurriculoComportamentais[]>(this.BaseUrl, this.token);
  }
  postCurriculoComportamentais(curriculoComportamentais: CurriculoComportamentais): Observable <CurriculoComportamentais>{
    return this.http.post<CurriculoComportamentais>(`${this.BaseUrl}`, curriculoComportamentais, this.token)
  }
  putCurriculoComportamentais(curriculoComportamentais: CurriculoComportamentais): Observable <CurriculoComportamentais>{
    return this.http.put<CurriculoComportamentais>(`${this.BaseUrl}`, curriculoComportamentais, this.token)
  }
  deleteCurriculoEducacao(id: number): Observable <void>{
    return this.http.delete<void>(`${this.BaseUrl}/${id}`,this.token)
  }
  postAllCurriculoComportamentais(curriculoComportamentais: CurriculoComportamentais[]): Observable <CurriculoComportamentais[]>{
    return this.http.post<CurriculoComportamentais[]>(`${this.BaseUrl}/All`, curriculoComportamentais, this.token)
  }
  putAllCurriculoComportamentais(curriculoComportamentais: CurriculoComportamentais[]): Observable <CurriculoComportamentais[]>{
    return this.http.put<CurriculoComportamentais[]>(`${this.BaseUrl}/All`, curriculoComportamentais, this.token)
  }
}

