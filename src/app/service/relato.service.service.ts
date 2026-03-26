import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { userInfo } from 'os';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  };

  getAll() {
    return this.http.get(`${environment.server}${environment.port}/tipoturma`, this.token)
  }

  getById(id: number) {
    return this.http.get(`${environment.server}${environment.port}/tipoturma/${id}`, this.token)
  }

  getByPrioridade(prioridade: any) {
    return this.http.get(`${environment.server}${environment.port}/tipoturma/${prioridade}`, this.token)
  }

  post(relato: any){
    return this.http.post(`${environment.server}${environment.port}/turma`, relato, this.token)
  }

  put(relato: any){
    return this.http.put(`${environment.server}${environment.port}/turma`, relato, this.token)
  }

  delete(id: number): Observable <void>{
    return this.http.delete<void>(`${environment.server}${environment.port}/turma/${id}`, this.token)
  }
}
