import { Trilha } from './../model/Trilha';
import { Turma } from './../model/Tuma';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrilhaService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(`http://93.188.161.223:9002/trilha`)
  }

  getById(id: number){
    return this.http.get(`http://93.188.161.223:9002/trilha/${id}`)
  }

  post(trilha: Trilha){
    return this.http.post(`http://93.188.161.223:9002/trilha`, trilha)
  }
}
