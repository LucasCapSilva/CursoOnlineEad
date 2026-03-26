import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { AtividadeService } from '../../service/atividade.service';
import { MockAuthService } from './mock-auth.service';
import { MockUserService } from './mock-user.service';
import { MockAtividadeService } from './mock-atividade.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceFactoryService {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private atividadeService: AtividadeService,
    private mockAuthService: MockAuthService,
    private mockUserService: MockUserService,
    private mockAtividadeService: MockAtividadeService
  ) { }

  getAuthService(): AuthService | MockAuthService {
    return environment.useMockServices ? this.mockAuthService : this.authService;
  }

  getUserService(): UserService | MockUserService {
    return environment.useMockServices ? this.mockUserService : this.userService;
  }

  getAtividadeService(): AtividadeService | MockAtividadeService {
    return environment.useMockServices ? this.mockAtividadeService : this.atividadeService;
  }

  // Add more service getters as needed

  isMockMode(): boolean {
    return environment.useMockServices;
  }
}