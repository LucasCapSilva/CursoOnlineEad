import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { userInfo } from 'os';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrutorBlocoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  };

  getAllInstrutor() {
    return this.http.get(`${environment.server}${environment.port}/tipoturma`, this.token)
  }

  getByIdInstrutor(id: number) {
    return this.http.get(`${environment.server}${environment.port}/tipoturma/${id}`, this.token)
  }


  postInstrutor(instrutor: any){
    return this.http.post(`${environment.server}${environment.port}/turma`, instrutor, this.token)
  }

  putInstrutor(instrutor: any){
    return this.http.put(`${environment.server}${environment.port}/turma`, instrutor, this.token)
  }

  deleteInstrutor(id: number): Observable <void>{
    return this.http.delete<void>(`${environment.server}${environment.port}/turma/${id}`, this.token)
  }
}
