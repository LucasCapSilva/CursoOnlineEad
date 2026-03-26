import { FormBemEstarSolicita } from './../model/FormBemEstarSolicita';
import { FormBemEstarPos } from './../model/FormBemEstarPos';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BemestarService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  // Form de pós atendimento

  getAllFormsPos(){
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento`, this.token)
  }

  getByIdFormPos(id: number) {
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/${id}`, this.token);
  }

  postFormPos(form: FormBemEstarPos){
    return this.http.post(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento`, form, this.token)
  }

  putFormPos(form: FormBemEstarPos){
    return this.http.put(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento`, form, this.token)
  }

  deleteFormPos(id: number){
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/${id}`, this.token);
  }

  // Form de solicitação de atendimento

  getAllFormsSolicita(){
    return this.http.get(`${environment.server}${environment.port}/bem-estar-form-solicitaco`, this.token)
  }

  getByIdFormSolicita(id: number) {
    return this.http.get(`${environment.server}${environment.port}/bem-estar-form-solicitaco/${id}`, this.token);
  }

  postFormSolicita(form: FormBemEstarSolicita){
    return this.http.post(`${environment.server}${environment.port}/bem-estar-form-solicitaco`, form, this.token)
  }

  putFormSolicita(form: FormBemEstarSolicita){
    return this.http.put(`${environment.server}${environment.port}/bem-estar-form-solicitaco`, form, this.token)
  }

  deleteFormSolicita(id: number){
    return this.http.get(`${environment.server}${environment.port}/bem-estar-form-solicitaco/${id}`, this.token);
  }

  // Relatórios

}
