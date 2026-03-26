import { Turma } from './../model/Tuma';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  userInactive(id: number){
    return this.http.get(`${environment.server}${environment.port}/userUpdatePerfil/inactive/${id}`, this.token)
  }

  getAllTipoTurma(){
    return this.http.get(`${environment.server}${environment.port}/tipoturma`, this.token)
  }

  getAllCurso(){
    return this.http.get(`${environment.server}${environment.port}/curso`, this.token)
  }

  getCursoById(id: number){
    return this.http.get(`${environment.server}${environment.port}/curso/${id}`, this.token)
  }

  getTipoTurmaById(id: number){
    return this.http.get(`${environment.server}${environment.port}/tipoturma/${id}`, this.token)
  }

  postTurma(turma: Turma){
    return this.http.post(`${environment.server}${environment.port}/turma`, turma, this.token)
  }
}
