import { LinksUteis } from './../model/LinksUteis';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root'
})
export class LinksUteisService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  postLinks(linksUteis: LinksUteis): Observable<any> {
    if (environment.useMockServices) {
      return of({ ...linksUteis, id: Date.now() }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/links`, linksUteis, this.token);
  }

  getLinks(isFixo: number): Observable<any> {
    if (environment.useMockServices) {
      const links: LinksUteis[] = [
        {
          id: 1,
          user: { id: 1, nome: 'João Silva' } as User,
          link: 'https://angular.io/docs',
          descricao: 'Documentação Angular',
          data: new Date('2026-03-20'),
          fixo: 1
        },
        {
          id: 2,
          user: { id: 2, nome: 'Maria Santos' } as User,
          link: 'https://rxjs.dev',
          descricao: 'Guia RxJS',
          data: new Date('2026-03-22'),
          fixo: 0
        }
      ];
      return of(links.filter(item => item.fixo === isFixo)).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/links/fixo/${isFixo}`, this.token);
  }

  getByIdLink(idLink: number): Observable<any> {
    if (environment.useMockServices) {
      return of({
        id: idLink,
        user: { id: 1, nome: 'João Silva' } as User,
        link: 'https://angular.io/docs',
        descricao: 'Documentação Angular',
        data: new Date('2026-03-20'),
        fixo: 1
      }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/links/${idLink}`, this.token);
  }

  putLink(linksUteis: LinksUteis): Observable<any> {
    if (environment.useMockServices) {
      return of(linksUteis).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/links`, linksUteis, this.token);
  }

  getByLink(link: string): Observable<any> {
    if (environment.useMockServices) {
      return of([{ id: 1, user: { id: 1, nome: 'João Silva' } as User, link, descricao: 'Resultado mock', data: new Date(), fixo: 0 }]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/links/name?link=${link}`, this.token);
  }

}
