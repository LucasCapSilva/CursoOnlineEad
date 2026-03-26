import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiarioDeBordoService {

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

  getByJornada(jornada: string) {
    return this.http.get(`${environment.server}${environment.port}turma/get-instr/${jornada}`, this.token)
  }

  getByLead(lead: number) {
    return this.http.get(`${environment.server}${environment.port}turma/get-instr/${lead}`, this.token)
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
