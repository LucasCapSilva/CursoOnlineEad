import { Zoom } from './../model/Zoom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  getByIdTurma(id: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ id, descricao: `Turma ${id}` }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/${id}`, this.token);
  }

  getAllTurma(): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, descricao: 'Turma A' }, { id: 2, descricao: 'Turma B' }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/`, this.token);
  }

  
  getAllTurmaCombo(): Observable<any> {
    if (environment.useMockServices) {
      return this.getAllTurma();
    }
    return this.http.get(`${environment.server}${environment.port}/turma/By-Combo`, this.token)
  }

  getByIdLink(idLink: number): Observable<any> {
    if (environment.useMockServices) {
      return of({
        id: idLink,
        descricao: 'Link fixo da turma',
        link: 'https://meet.example.com/turma-a',
        turma: { id: 1, descricao: 'Turma A' },
        fixo: 1
      }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/zoom/${idLink}`, this.token);
  }

  getAllLinkByTurma(idTurma: number, isFixo: number): Observable<any> {
    if (environment.useMockServices) {
      const links: Zoom[] = [
        { id: 1, descricao: 'Aula ao vivo', link: 'https://meet.example.com/aula', turma: { id: 1, descricao: 'Turma A' } as any, fixo: 1 },
        { id: 2, descricao: 'Plantão', link: 'https://meet.example.com/plantao', turma: { id: 1, descricao: 'Turma A' } as any, fixo: 0 }
      ];
      return of(links.filter(item => item.turma.id === idTurma && item.fixo === isFixo)).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/zoom/fixo/${isFixo}/${idTurma}`, this.token);
  }

  getAllLinksZoom(): Observable<any> {
    if (environment.useMockServices) {
      return of([
        { id: 1, descricao: 'Aula ao vivo', link: 'https://meet.example.com/aula', turma: { id: 1, descricao: 'Turma A' }, fixo: 1 },
        { id: 2, descricao: 'Plantão', link: 'https://meet.example.com/plantao', turma: { id: 2, descricao: 'Turma B' }, fixo: 0 }
      ]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/zoom/`, this.token);
  }

  postLinkZoom(linkZoom: Zoom): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...linkZoom, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/zoom/`, linkZoom, this.token);
  }

  deleteLinkZoom(idLink: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ deleted: true, id: idLink }).pipe(delay(500));
    }
    return this.http.delete(`${environment.server}${environment.port}/zoom/${idLink}`, this.token);
  }

  puttLinkZoom(linkZoom: Zoom): Observable<any> {
    if (environment.useMockServices) {
      return of(linkZoom).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/zoom/`, linkZoom, this.token);
  }

  getClickLinkZoom(isUser: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ ok: true, idUser: isUser }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/presencazoom/entrada/${isUser}`, this.token);
  }

  getAllTipoTurma(): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, descricao: 'Presencial' }, { id: 2, descricao: 'Online' }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/tipoturma`, this.token)
  }
}
