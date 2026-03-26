import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

import { Turma } from "../model/Tuma";


@Injectable({
    providedIn: 'root'
  })
  export class UserPendenteService {

    constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

    sendEmailByTurmaId(turmaId: number) {
      return this.http.get(`${environment.server}${environment.port}/userPendente/envioEmail/${turmaId}`, this.token);
      }
  
  }