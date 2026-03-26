import { environment } from 'src/environments/environment.prod';
import { GithubParticipante } from './../model/GithubParticipante';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubParticipanteService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  getGithubById(id: number): Observable<GithubParticipante> {
    return this.http.get<GithubParticipante>(`${environment.server}${environment.port}/usergithub/${id}`, this.token)
  }

  getGithubApi(nickName: string): Observable<any> {
    return this.http.get<any>(`https://api.github.com/users/${nickName}`)
  }

  getGithubByUserId(id: number): Observable<GithubParticipante> {
    return this.http.get<GithubParticipante>(`${environment.server}${environment.port}/usergithub/user_git/${id}`, this.token)
  }

  postGithub(github: GithubParticipante): Observable<GithubParticipante> {
    return this.http.post<GithubParticipante>(`${environment.server}${environment.port}/usergithub/`, github, this.token)
  }

  putGithub(github: GithubParticipante): Observable<GithubParticipante> {
    return this.http.put<GithubParticipante>(`${environment.server}${environment.port}/usergithub/`, github, this.token)
  }

  deleteGithub(id: number){
    return this.http.delete(`${environment.server}${environment.port}/usergithub/${id}`, this.token)
  }
  
}
