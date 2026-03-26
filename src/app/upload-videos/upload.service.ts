import { UploadVideo } from './../model/UploadVideo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  getAllModulos() {
    return this.http.get('http://31.220.57.121:9000/modulo', this.token);
  }

  getIdModulos(id: number) {
    return this.http.get(`http://31.220.57.121:9000/modulo/${id}`, this.token);
  }

  postCadastroVideo(cadastroVideo: UploadVideo) {
    return this.http.post('http://31.220.57.121:9001/api/file/aula', cadastroVideo);
  }

}
