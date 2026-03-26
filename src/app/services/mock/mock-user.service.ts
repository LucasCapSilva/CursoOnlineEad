import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../../model/User';
import { Turma } from '../../model/Tuma';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {

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
    },
    {
      id: 4,
      nome: 'Pedro Oliveira',
      usuario: 'pedro@email.com',
      password: '123456',
      profile: 'ROLE_ALUNO',
      turma: { id: 2, descricao: 'Turma B' } as Turma,
      ativo: 1
    },
    {
      id: 5,
      nome: 'Carlos Lima',
      usuario: 'carlos@email.com',
      password: '123456',
      profile: 'ROLE_INSTRUTOR',
      turma: { id: 2, descricao: 'Turma B' } as Turma,
      ativo: 1
    }
  ];

  constructor() { }

  getAllUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(this.simulateDelay));
  }

  getUserById(id: number): Observable<User> {
    const user = this.mockUsers.find(u => u.id === id);
    if (user) {
      return of(user).pipe(delay(this.simulateDelay));
    } else {
      return new Observable(subscriber => {
        subscriber.error({ error: 'Usuário não encontrado' });
      }).pipe(delay(this.simulateDelay));
    }
  }

  getUserByProfileAll(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(this.simulateDelay));
  }

  getUserByProfileByRole(role: string): Observable<User[]> {
    const filteredUsers = this.mockUsers.filter(u => u.profile === role);
    return of(filteredUsers).pipe(delay(this.simulateDelay));
  }

  getUserByPrioridadesAll(): Observable<User[]> {
    // Simula prioridades - neste mock, retornamos todos os usuários ativos
    const activeUsers = this.mockUsers.filter(u => u.ativo === 1);
    return of(activeUsers).pipe(delay(this.simulateDelay));
  }
}