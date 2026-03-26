import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../../model/User';
import { UserLogin } from '../../model/UserLogin';
import { Turma } from '../../model/Tuma';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {

  private simulateDelay = 500;
  
  private mockUsers: User[] = [
    {
      id: 1,
      nome: 'João Silva',
      usuario: 'joao@email.com',
      password: '123456',
      profile: 'ROLE_ALUNO',
      turma: { id: 1, descricao: 'Turma A' } as Turma,
      ativo: 1
    },
    {
      id: 2,
      nome: 'Maria Santos', 
      usuario: 'maria@email.com',
      password: '123456',
      profile: 'ROLE_INSTRUTOR',
      turma: { id: 1, descricao: 'Turma A' } as Turma,
      ativo: 1
    },
    {
      id: 3,
      nome: 'Ana Costa',
      usuario: 'ana@email.com',
      password: '123456',
      profile: 'ROLE_ADMIN',
      turma: { id: 3, descricao: 'Turma C' } as Turma,
      ativo: 1
    }
  ];

  constructor() { }

  cadastrar(user: User): Observable<any> {
    const newUser = { ...user, id: this.mockUsers.length + 1 };
    this.mockUsers.push(newUser);
    return of({ message: 'Usuário criado com sucesso', user: newUser }).pipe(delay(this.simulateDelay));
  }

  cadastroAll(userList: User[]): Observable<any> {
    userList.forEach(user => {
      const newUser = { ...user, id: this.mockUsers.length + 1 };
      this.mockUsers.push(newUser);
    });
    return of({ message: 'Usuários criados com sucesso', count: userList.length }).pipe(delay(this.simulateDelay));
  }

  logar(userLogin: UserLogin): Observable<any> {
    const user = this.mockUsers.find(u => u.usuario === userLogin.usuario && u.password === userLogin.password);
    
    if (user) {
      // Simula token de autenticação
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Atualiza environment com dados do usuário logado
      environment.token = mockToken;
      environment.nome = user.nome;
      environment.profile = user.profile;
      environment.idUsuario = user.id;
      environment.idTurma = user.turma.id;
      environment.turma = user.turma.descricao;
      
      return of({
        token: mockToken,
        nome: user.nome,
        profile: user.profile,
        idUsuario: user.id,
        idTurma: user.turma.id,
        turma: user.turma.descricao
      }).pipe(delay(this.simulateDelay));
    } else {
      return new Observable(subscriber => {
        subscriber.error({ error: 'Credenciais inválidas' });
      }).pipe(delay(this.simulateDelay));
    }
  }

  userInactive(id: number): Observable<any> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.mockUsers[userIndex].ativo = 0;
      return of({ message: 'Usuário inativado com sucesso' }).pipe(delay(this.simulateDelay));
    }
    return new Observable(subscriber => {
      subscriber.error({ error: 'Usuário não encontrado' });
    }).pipe(delay(this.simulateDelay));
  }

  // Métodos de verificação de permissão (mantidos da implementação original)
  acessoMenu(permissao: string) {
    return permissao = environment.token;
  }

  nomeUsuario(nome: string) {
    return nome = environment.nome;
  }

  icones() {
    let icon = environment.icon;
    return icon;
  }

  envioBarometro() {
    return environment.enviosBarometroDia;
  }

  titulos() {
    let titulo = environment.titulo;
    return titulo;
  }

  adm() {
    let ok = false;
    const profile = environment.profile;
    if (profile === 'ROLE_ADMIN') {
      ok = true;
    }
    return ok;
  }

  programas() {
    let ok = false;
    const idTurma = environment.idTurma;
    if (idTurma == 16) {
      ok = true;
    }
    return ok;
  }

  staff() {
    let ok = false;
    const idTurma = environment.idTurma;
    if (idTurma == 6) {
      ok = true;
    }
    return ok;
  }

  mobile() {
    let ok = false;
    const idTurma = environment.idTurma;
    if (idTurma == 47) {
      ok = true;
    }
    return ok;
  }

  turma35() {
    let ok = false;
    const idTurma = environment.idTurma;
    if (idTurma == 43) {
      ok = true;
    }
    return ok;
  }

  turma36() {
    let ok = false;
    const idTurma = environment.idTurma;
    if (idTurma == 44) {
      ok = true;
    }
    return ok;
  }

  turma37() {
    let ok = false;
    const idTurma = environment.idTurma;
    if (idTurma == 45) {
      ok = true;
    }
    return ok;
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
}