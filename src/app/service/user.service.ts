import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  getAllUsers(): Observable<any> {
    if (environment.useMockServices) {
      const mockUsers: User[] = [
        {
          id: 1,
          nome: 'João Silva',
          usuario: 'joao@email.com',
          password: '123456',
          profile: 'ROLE_ALUNO',
          turma: { id: 1, descricao: 'Turma A' } as any,
          ativo: 1
        },
        {
          id: 2,
          nome: 'Maria Santos',
          usuario: 'maria@email.com', 
          password: '123456',
          profile: 'ROLE_ADMIN',
          turma: { id: 1, descricao: 'Turma A' } as any,
          ativo: 1
        },
        {
          id: 3,
          nome: 'Pedro Oliveira',
          usuario: 'pedro@email.com',
          password: '123456',
          profile: 'ROLE_ALUNO',
          turma: { id: 2, descricao: 'Turma B' } as any,
          ativo: 1
        }
      ];
      return of(mockUsers).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/user-utils`, this.token);
    }
  }

  getUserById(id: number): Observable<any> {
    if (environment.useMockServices) {
      const mockUsers: User[] = [
        {
          id: 1,
          nome: 'João Silva',
          usuario: 'joao@email.com',
          password: '123456',
          profile: 'ROLE_ALUNO',
          turma: { id: 1, descricao: 'Turma A' } as any,
          ativo: 1
        },
        {
          id: 2,
          nome: 'Maria Santos',
          usuario: 'maria@email.com',
          password: '123456',
          profile: 'ROLE_ADMIN', 
          turma: { id: 1, descricao: 'Turma A' } as any,
          ativo: 1
        }
      ];
      const user = mockUsers.find(u => u.id === id);
      if (user) {
        return of(user).pipe(delay(500));
      } else {
        return new Observable(subscriber => {
          subscriber.error({ error: 'Usuário não encontrado' });
        }).pipe(delay(500));
      }
    } else {
      return this.http.get(`${environment.server}${environment.port}/user-utils/${id}`, this.token);
    }
  }

  getUserByProfileAll(): Observable<any> {
    if (environment.useMockServices) {
      const mockUsers: User[] = [
        {
          id: 1,
          nome: 'João Silva',
          usuario: 'joao@email.com',
          password: '123456',
          profile: 'ROLE_ALUNO',
          turma: { id: 1, descricao: 'Turma A' } as any,
          ativo: 1
        },
        {
          id: 2,
          nome: 'Maria Santos',
          usuario: 'maria@email.com',
          password: '123456',
          profile: 'ROLE_ADMIN',
          turma: { id: 1, descricao: 'Turma A' } as any,
          ativo: 1
        }
      ];
      return of(mockUsers).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/user-utils/profile/all`, this.token);
    }
  }

  getUserByProfileByRole(role: string): Observable<any> {
    if (environment.useMockServices) {
      const mockUsers: User[] = [
        {
          id: 1,
          nome: 'João Silva',
          usuario: 'joao@email.com',
          password: '123456',
          profile: 'ROLE_ALUNO',
          turma: { id: 1, descricao: 'Turma A' } as any,
          ativo: 1
        },
        {
          id: 2,
          nome: 'Maria Santos',
          usuario: 'maria@email.com',
          password: '123456',
          profile: 'ROLE_ADMIN',
          turma: { id: 1, descricao: 'Turma A' } as any,
          ativo: 1
        }
      ];
      const filteredUsers = mockUsers.filter(u => u.profile === role);
      return of(filteredUsers).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/user-utils/profile/${role}`, this.token);
    }
  }

  getUserByPrioridadesAll(): Observable<any> {
    if (environment.useMockServices) {
      const mockUsers = [
        {
          id: 1,
          nome: 'João Silva',
          prioridade: 'Alta',
          motivo: 'Projeto atrasado'
        },
        {
          id: 2,
          nome: 'Maria Santos',
          prioridade: 'Média',
          motivo: 'Dúvidas técnicas'
        }
      ];
      return of(mockUsers).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/user-utils/profile/prioridades`, this.token);
    }
  }



}
