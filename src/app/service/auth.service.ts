import { Turma } from './../model/Tuma';
import { UserLogin } from '../model/UserLogin';
import { User } from '../model/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  acessoMenu(permissao: string) {
    return permissao = environment.token;
  }

  nomeUsuario(nome: string) {
    return nome = environment.nome;
  }

  icones(){
    let icon = environment.icon
    return icon
  }

  envioBarometro(){
    return environment.enviosBarometroDia
  }

  titulos(){
    let titulo = environment.titulo
    return titulo
  }

  adm() {
    let ok = false;
    const profile = environment.profile;
    if (profile === 'ROLE_ADMIN') {
      ok = true;
    }
    return ok;
  }

  programas(){
    let ok = false
    const idTurma = environment.idTurma
    if(idTurma == 16){
      ok = true
    }
    return ok
  }

  staff(){
    let ok = false
    const idTurma = environment.idTurma
    if(idTurma == 6){
      ok = true
    }
    return ok
  }


  mobile(){
    let ok = false
    const idTurma = environment.idTurma
    if(idTurma == 47){
      ok = true
    }
    return ok
  }

  turma35(){
    let ok = false
    const idTurma = environment.idTurma
    if(idTurma == 43){
      ok = true
    }
    return ok
  }

  turma36(){
    let ok = false
    const idTurma = environment.idTurma
    if(idTurma == 44){
      ok = true
    }
    return ok
  }

  turma37(){
    let ok = false
    const idTurma = environment.idTurma
    if(idTurma == 45){
      ok = true
    }
    return ok
  }

  


  instrutores() {
    let ok = false;
    const profile = environment.profile;
    if (profile === 'ROLE_INSTRUTOR') {
      ok = true;
    }
    return ok;
  }

  bemestar() {
    let ok = false;
    const profile = environment.profile;
    if (profile === 'ROLE_BEMESTAR') {
      ok = true;
    }
    return ok;
  }

  participante() {
    let ok = false;
    const profile = environment.profile;
    if (profile === 'ROLE_PARTICIPANTE') {
      ok = true;
    }
    return ok;
  }

  cadastrar(user: User) {
    return this.http.post(`${environment.server}${environment.port}/api/user/new`, user);
  }

  cadastroAll(userList: User[]){
    return this.http.post(`${environment.server}${environment.port}/api/user/new/all`, userList)
  }

  logar(userLogin: UserLogin): Observable<any> {
    if (environment.useMockServices) {
      // Mock data for authentication
      const mockUsers = [
        {
          id: 1,
          nome: 'João Silva',
          usuario: 'joao@email.com',
          password: '123456',
          profile: 'ROLE_ALUNO',
          turma: { id: 1, descricao: 'Turma A', curso: { id: 1, descricao: 'FullStack Java e React' } } as Turma,
          ativo: 1
        },
        {
          id: 2,
          nome: 'Maria Santos', 
          usuario: 'maria@email.com',
          password: '123456',
          profile: 'ROLE_ADMIN',
          turma: { id: 1, descricao: 'Turma A', curso: { id: 1, descricao: 'FullStack Java e React' } } as Turma,
          ativo: 1
        }
      ];

      const user = mockUsers.find(u => u.usuario === userLogin.usuario && u.password === userLogin.password);
      
      if (user) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const response = {
          token: mockToken,
          user: {
            id: user.id,
            nome: user.nome,
            profile: user.profile,
            turma: user.turma
          }
        };
        return of(response).pipe(delay(500));
      } else {
        return new Observable(subscriber => {
          subscriber.error({ error: 'E-mail ou senha inválidos' });
        }).pipe(delay(500));
      }
    } else {
      return this.http.post(`${environment.server}${environment.port}/api/user/auth`, userLogin);
    }
  }

  userInactive(id: number){
    return this.http.get(`${environment.server}${environment.port}/userUpdatePerfil/inactive/${id}`, this.token)
  }

}
