import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CurriculoTecnico } from '../model/CurriculoTecnico';

@Injectable({
  providedIn: 'root'
})
export class CurriculoTecnicoService {

BaseUrl: string = `${environment.server}${environment.port}/CurriculoTecnico`

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  }
  getAllCurriculoTecnico(): Observable<CurriculoTecnico[]> {
    return this.http.get<CurriculoTecnico[]>(this.BaseUrl, this.token);
  }

  getByIdCurriculoTecnico(id: number): Observable<CurriculoTecnico> {
    return this.http.get<CurriculoTecnico>(`${this.BaseUrl}/${id}`, this.token);
  }


  postCurriculoTecnico(curriculoTecnico: CurriculoTecnico): Observable<CurriculoTecnico>{
    return this.http.post<CurriculoTecnico>(`${this.BaseUrl}`, curriculoTecnico, this.token)
  }

  putCurriculoTecnico(curriculoTecnico: CurriculoTecnico): Observable<CurriculoTecnico>{
    return this.http.put<CurriculoTecnico>(`${this.BaseUrl}`, curriculoTecnico, this.token)
  }

  deleteCurriculoTecnico(id: number): Observable <void>{
    return this.http.delete<void>(`${this.BaseUrl}/${id}`,this.token)
  }

  postAllCurriculoTecnico(curriculoTecnico: CurriculoTecnico[]): Observable<CurriculoTecnico[]>{
    return this.http.post<CurriculoTecnico[]>(`${this.BaseUrl}/All`, curriculoTecnico, this.token)
  }
  putAllCurriculoTecnico(curriculoTecnico: CurriculoTecnico[]): Observable <CurriculoTecnico[]>{
    return this.http.put<CurriculoTecnico[]>(`${this.BaseUrl}/All`, curriculoTecnico, this.token)
  }
}
