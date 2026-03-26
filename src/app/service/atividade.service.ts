import { Entregas } from './../model/Entregas';
import { Atividade } from './../model/Atividade';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Turma } from '../model/Tuma';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  private mockTurmas: Turma[] = [
    { id: 1, descricao: 'Turma A' } as Turma,
    { id: 2, descricao: 'Turma B' } as Turma
  ];

  private mockAtividades: Atividade[] = [
    { id: 1, titulo: 'Exercício 01 - Componentes', atividade: 'Crie um componente card reutilizável com @Input.', linkUtil: 'https://angular.io/guide/component-overview', dataAtividade: new Date('2026-01-05'), dataEntrega: new Date('2026-01-10'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 2, titulo: 'Exercício 02 - Data Binding', atividade: 'Faça formulário com ngModel e validação básica.', linkUtil: 'https://angular.io/guide/forms', dataAtividade: new Date('2026-01-06'), dataEntrega: new Date('2026-01-11'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 3, titulo: 'Exercício 03 - Diretivas', atividade: 'Use *ngIf e *ngFor para montar uma lista dinâmica.', linkUtil: 'https://angular.io/guide/structural-directives', dataAtividade: new Date('2026-01-07'), dataEntrega: new Date('2026-01-12'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 4, titulo: 'Exercício 04 - Pipes', atividade: 'Aplique DatePipe e CurrencyPipe em tela de pedidos.', linkUtil: 'https://angular.io/guide/pipes', dataAtividade: new Date('2026-01-08'), dataEntrega: new Date('2026-01-13'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 5, titulo: 'Exercício 05 - Serviços', atividade: 'Crie serviço para centralizar regras de autenticação.', linkUtil: 'https://angular.io/guide/architecture-services', dataAtividade: new Date('2026-01-09'), dataEntrega: new Date('2026-01-14'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 6, titulo: 'Exercício 06 - HTTP', atividade: 'Consumir API pública e listar resultados em tabela.', linkUtil: 'https://angular.io/guide/http', dataAtividade: new Date('2026-01-10'), dataEntrega: new Date('2026-01-15'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 7, titulo: 'Exercício 07 - Rotas', atividade: 'Configurar rotas com parâmetros e página de detalhe.', linkUtil: 'https://angular.io/guide/router', dataAtividade: new Date('2026-01-11'), dataEntrega: new Date('2026-01-16'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 8, titulo: 'Exercício 08 - Guardas', atividade: 'Implementar guarda simples para rota autenticada.', linkUtil: 'https://angular.io/guide/router#milestone-5-route-guards', dataAtividade: new Date('2026-01-12'), dataEntrega: new Date('2026-01-17'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 9, titulo: 'Exercício 09 - Interceptor', atividade: 'Adicionar interceptor para enviar token em requests.', linkUtil: 'https://angular.io/guide/http#intercepting-requests-and-responses', dataAtividade: new Date('2026-01-13'), dataEntrega: new Date('2026-01-18'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 10, titulo: 'Exercício 10 - RXJS', atividade: 'Usar map, filter e switchMap em fluxo de busca.', linkUtil: 'https://rxjs.dev/guide/operators', dataAtividade: new Date('2026-01-14'), dataEntrega: new Date('2026-01-19'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 11, titulo: 'Exercício 11 - Java Básico', atividade: 'Criar classe com encapsulamento e métodos utilitários.', linkUtil: 'https://docs.oracle.com/javase/tutorial/java/concepts/', dataAtividade: new Date('2026-01-15'), dataEntrega: new Date('2026-01-20'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 12, titulo: 'Exercício 12 - SQL Select', atividade: 'Montar consultas com JOIN para relatório de vendas.', linkUtil: 'https://www.w3schools.com/sql/sql_join.asp', dataAtividade: new Date('2026-01-16'), dataEntrega: new Date('2026-01-21'), turma: this.mockTurmas[0], entrega: null, entregaOk: false },
    { id: 13, titulo: 'Exercício 13 - Scrum Backlog', atividade: 'Criar backlog priorizado com critérios de aceite.', linkUtil: 'https://www.scrum.org/resources/what-is-a-product-backlog', dataAtividade: new Date('2026-01-17'), dataEntrega: new Date('2026-01-22'), turma: this.mockTurmas[1], entrega: null, entregaOk: false },
    { id: 14, titulo: 'Exercício 14 - Git Branch', atividade: 'Simular fluxo git flow com branch feature e merge.', linkUtil: 'https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow', dataAtividade: new Date('2026-01-18'), dataEntrega: new Date('2026-01-23'), turma: this.mockTurmas[1], entrega: null, entregaOk: false },
    { id: 15, titulo: 'Exercício 15 - API REST', atividade: 'Desenhar endpoints CRUD para módulo de produtos.', linkUtil: 'https://restfulapi.net/resource-naming/', dataAtividade: new Date('2026-01-19'), dataEntrega: new Date('2026-01-24'), turma: this.mockTurmas[1], entrega: null, entregaOk: false },
    { id: 16, titulo: 'Exercício 16 - NestJS', atividade: 'Criar controller e service para usuários.', linkUtil: 'https://docs.nestjs.com/controllers', dataAtividade: new Date('2026-01-20'), dataEntrega: new Date('2026-01-25'), turma: this.mockTurmas[1], entrega: null, entregaOk: false },
    { id: 17, titulo: 'Exercício 17 - Spring Boot', atividade: 'Criar endpoint GET com paginação.', linkUtil: 'https://spring.io/guides/gs/rest-service/', dataAtividade: new Date('2026-01-21'), dataEntrega: new Date('2026-01-26'), turma: this.mockTurmas[1], entrega: null, entregaOk: false },
    { id: 18, titulo: 'Exercício 18 - Android Layout', atividade: 'Montar tela de login com ConstraintLayout.', linkUtil: 'https://developer.android.com/develop/ui/views/layout/constraint-layout', dataAtividade: new Date('2026-01-22'), dataEntrega: new Date('2026-01-27'), turma: this.mockTurmas[1], entrega: null, entregaOk: false },
    { id: 19, titulo: 'Exercício 19 - React Hooks', atividade: 'Criar contador com useState e useEffect.', linkUtil: 'https://react.dev/reference/react', dataAtividade: new Date('2026-01-23'), dataEntrega: new Date('2026-01-28'), turma: this.mockTurmas[1], entrega: null, entregaOk: false },
    { id: 20, titulo: 'Exercício 20 - Docker', atividade: 'Criar Dockerfile e executar app em container.', linkUtil: 'https://docs.docker.com/get-started/', dataAtividade: new Date('2026-01-24'), dataEntrega: new Date('2026-01-29'), turma: this.mockTurmas[1], entrega: null, entregaOk: false }
  ];

  // Atividades

  postAtividade(atividades: Atividade): Observable<any> {
    if (environment.useMockServices) {
      return of({ message: 'Atividade criada com sucesso', id: Date.now() }).pipe(delay(500));
    } else {
      return this.http.post(`${environment.server}${environment.port}/atividades`, atividades, this.token);
    }
  }

  getAtividadeByTurma(idTurma: number): Observable<any> {
    if (environment.useMockServices) {
      const atividades = this.mockAtividades.filter(a => a.turma.id === idTurma);
      return of(atividades).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/atividades/turma/${idTurma}`, this.token);
    }
  }

  getAtividadeByTurmaEUser(idTurma: number, idUser: number): Observable<any> {
    if (environment.useMockServices) {
      const atividades = this.mockAtividades.filter(a => a.turma.id === idTurma);
      return of(atividades).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/atividades/turma/${idTurma}/${idUser}`, this.token);
    }
  }

  putAtividade(atividade: Atividade): Observable<any> {
    if (environment.useMockServices) {
      return of({ message: 'Atividade atualizada com sucesso' }).pipe(delay(500));
    } else {
      return this.http.put(`${environment.server}${environment.port}/atividades`, atividade, this.token);
    }
  }

  deleteAtividade(idAtividade: number): Observable<any> {
    if (environment.useMockServices) {
      return of({ message: 'Atividade deletada com sucesso' }).pipe(delay(500));
    } else {
      return this.http.delete(`${environment.server}${environment.port}/atividades/${idAtividade}`, this.token);
    }
  }

  getByIdAtividade(idAtividade: number): Observable<any> {
    if (environment.useMockServices) {
      const atividade = this.mockAtividades.find(a => a.id === idAtividade);
      if (atividade) {
        return of(atividade).pipe(delay(500));
      } else {
        return new Observable(subscriber => {
          subscriber.error({ error: 'Atividade não encontrada' });
        }).pipe(delay(500));
      }
    } else {
      return this.http.get(`${environment.server}${environment.port}/atividades/${idAtividade}`, this.token);
    }
  }

  // Entregas

  getAllEntregas(): Observable<any> {
    if (environment.useMockServices) {
      const mockEntregas: Entregas[] = [
        {
          id: 1,
          observacoes: 'Bom trabalho!',
          linkEntrega: 'https://github.com/joao/exercicio-components',
          usuario: { id: 1, nome: 'João Silva' } as User,
          dataEntrega: new Date('2024-03-28'),
          atividade: { id: 1, titulo: 'Exercício de Components' } as Atividade,
          atraso: false,
          entregaOk: true
        },
        {
          id: 2,
          observacoes: null,
          linkEntrega: null,
          usuario: { id: 1, nome: 'João Silva' } as User,
          dataEntrega: null,
          atividade: { id: 2, titulo: 'Projeto de Services' } as Atividade,
          atraso: false,
          entregaOk: false
        }
      ];
      return of(mockEntregas).pipe(delay(500));
    } else {
      return this.http.get(`${environment.server}${environment.port}/entrega`, this.token);
    }
  }

  getByIdEntrega(idEntrega: number) {
    return this.http.get(`${environment.server}${environment.port}/entrega/${idEntrega}`, this.token);
}

  getAllEntregasByIdTurmaByIdAtividade(idTurma: number,idAtividade: number) {
    if (environment.useMockServices) {
      const mockEntregas: Entregas[] = [
        { id: 1, observacoes: 'Entrega realizada', linkEntrega: 'https://github.com/joao/exercicio-components', usuario: { id: 1, nome: 'João Silva' } as User, dataEntrega: new Date('2026-01-20'), atividade: { id: idAtividade, titulo: `Atividade ${idAtividade}` } as Atividade, atraso: false, entregaOk: true },
        { id: 2, observacoes: 'Precisa ajustar README', linkEntrega: 'https://github.com/maria/exercicio-components', usuario: { id: 2, nome: 'Maria Santos' } as User, dataEntrega: new Date('2026-01-21'), atividade: { id: idAtividade, titulo: `Atividade ${idAtividade}` } as Atividade, atraso: false, entregaOk: true }
      ];
      return of(mockEntregas).pipe(delay(500));
    }
      return this.http.get(`${environment.server}${environment.port}/entrega-obrigatoria/${idTurma}/${idAtividade}`, this.token);
  }

  postEntrega(entrega: Entregas) {
    if (environment.useMockServices) {
      return of({ ...entrega, id: Date.now(), dataEntrega: new Date(), entregaOk: true }).pipe(delay(500));
    }
    return this.http.post(`${environment.server}${environment.port}/entrega`, entrega, this.token);
  }

  getByIdParticipanteEAtividade(idUser: number) {
    if (environment.useMockServices) {
      return of([
        { id: 1, usuario: { id: idUser, nome: 'Usuário Mock' }, entregaOk: true },
        { id: 2, usuario: { id: idUser, nome: 'Usuário Mock' }, entregaOk: false }
      ]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/entrega/participante/${idUser}`, this.token);
  }

  putEntrega(entrega: Entregas) {
    if (environment.useMockServices) {
      return of({ ...entrega, entregaOk: true }).pipe(delay(500));
    }
    return this.http.put(`${environment.server}${environment.port}/entrega`, entrega, this.token);
  }

  getByIdTurma(id: number) {
    if (environment.useMockServices) {
      return of({ id, descricao: `Turma ${id}`, curso: { id: 1, descricao: 'Curso Full Stack' } }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/${id}`, this.token);
  }

  getAllTurma() {
    if (environment.useMockServices) {
      return of([
        { id: 1, descricao: 'Turma A', curso: { id: 1, descricao: 'Curso Full Stack' } },
        { id: 2, descricao: 'Turma B', curso: { id: 1, descricao: 'Curso Full Stack' } }
      ]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/`, this.token);
  }

  getAllTurmaCombo(){
    if (environment.useMockServices) {
      return this.getAllTurma();
    }
    return this.http.get(`${environment.server}${environment.port}/turma/By-Combo`, this.token)
  }
}
