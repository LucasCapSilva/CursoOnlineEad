import { EntregasObrigatorias } from './../model/EntregasObrigatorias';
import { AtividadeLiberada } from './../model/AtividadeLiberada';
import { AtividadeObrigatoria } from './../model/AtividadeObrigatoria';
import { environment } from './../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtividadesObrigatoriasService {

  constructor(private http: HttpClient) { }

  token = { headers: new HttpHeaders().set('Authorization', environment.token) }
  private simulateDelay = 300

  private mockTurmas = [
    { id: 1, descricao: 'Turma A' },
    { id: 2, descricao: 'Turma B' }
  ] as any[]

  private mockAtividadesObrigatorias: AtividadeObrigatoria[] = [
    { id: 1, titulo: 'Obrigatório 01 - Componentes', atividade: 'Criar componente reutilizável com @Input.', linkUtil: 'https://angular.io/guide/component-overview', dataAtividade: new Date('2026-01-05'), dataEntrega: null, modulo: { id: 1, descricao: 'Angular Base' } as any, entrega: [], entregaOk: false, liberacao: null, check: false },
    { id: 2, titulo: 'Obrigatório 02 - Formulários', atividade: 'Criar formulário com validações reativas.', linkUtil: 'https://angular.io/guide/reactive-forms', dataAtividade: new Date('2026-01-06'), dataEntrega: null, modulo: { id: 1, descricao: 'Angular Base' } as any, entrega: [], entregaOk: false, liberacao: null, check: false },
    { id: 3, titulo: 'Obrigatório 03 - HTTP', atividade: 'Consumir endpoint e tratar loading/erro.', linkUtil: 'https://angular.io/guide/http', dataAtividade: new Date('2026-01-07'), dataEntrega: null, modulo: { id: 1, descricao: 'Angular Base' } as any, entrega: [], entregaOk: false, liberacao: null, check: false },
    { id: 4, titulo: 'Obrigatório 04 - Rotas', atividade: 'Configurar rotas protegidas com guarda.', linkUtil: 'https://angular.io/guide/router', dataAtividade: new Date('2026-01-08'), dataEntrega: null, modulo: { id: 2, descricao: 'Angular Intermediário' } as any, entrega: [], entregaOk: false, liberacao: null, check: false },
    { id: 5, titulo: 'Obrigatório 05 - RxJS', atividade: 'Aplicar switchMap em busca incremental.', linkUtil: 'https://rxjs.dev/guide/operators', dataAtividade: new Date('2026-01-09'), dataEntrega: null, modulo: { id: 2, descricao: 'Angular Intermediário' } as any, entrega: [], entregaOk: false, liberacao: null, check: false },
    { id: 6, titulo: 'Obrigatório 06 - SQL JOIN', atividade: 'Criar consulta com JOIN e filtros.', linkUtil: 'https://www.w3schools.com/sql/sql_join.asp', dataAtividade: new Date('2026-01-10'), dataEntrega: null, modulo: { id: 3, descricao: 'Back-end' } as any, entrega: [], entregaOk: false, liberacao: null, check: false },
    { id: 7, titulo: 'Obrigatório 07 - API REST', atividade: 'Definir endpoints CRUD com boas práticas.', linkUtil: 'https://restfulapi.net/resource-naming/', dataAtividade: new Date('2026-01-11'), dataEntrega: null, modulo: { id: 3, descricao: 'Back-end' } as any, entrega: [], entregaOk: false, liberacao: null, check: false },
    { id: 8, titulo: 'Obrigatório 08 - Projeto Final', atividade: 'Entregar mini projeto integrando front e API.', linkUtil: 'https://angular.io/start', dataAtividade: new Date('2026-01-12'), dataEntrega: null, modulo: { id: 4, descricao: 'Projeto' } as any, entrega: [], entregaOk: false, liberacao: null, check: false }
  ]

  private mockAtividadesLiberadas: AtividadeLiberada[] = [
    { id: 101, atividade: this.mockAtividadesObrigatorias[0], turma: this.mockTurmas[0] as any, liberar: false, entrega: null, check: false },
    { id: 102, atividade: this.mockAtividadesObrigatorias[1], turma: this.mockTurmas[0] as any, liberar: true, entrega: new Date('2026-01-18'), check: false },
    { id: 103, atividade: this.mockAtividadesObrigatorias[2], turma: this.mockTurmas[0] as any, liberar: false, entrega: null, check: false },
    { id: 104, atividade: this.mockAtividadesObrigatorias[3], turma: this.mockTurmas[0] as any, liberar: true, entrega: new Date('2026-01-20'), check: false },
    { id: 105, atividade: this.mockAtividadesObrigatorias[4], turma: this.mockTurmas[1] as any, liberar: false, entrega: null, check: false },
    { id: 106, atividade: this.mockAtividadesObrigatorias[5], turma: this.mockTurmas[1] as any, liberar: true, entrega: new Date('2026-01-22'), check: false },
    { id: 107, atividade: this.mockAtividadesObrigatorias[6], turma: this.mockTurmas[1] as any, liberar: false, entrega: null, check: false },
    { id: 108, atividade: this.mockAtividadesObrigatorias[7], turma: this.mockTurmas[1] as any, liberar: true, entrega: new Date('2026-01-24'), check: false }
  ]

  private mockEntregasObrigatorias: EntregasObrigatorias[] = [
    { id: 1, observacoes: 'Entrega ok', linkEntrega: 'https://github.com/aluno/projeto-obrigatorio-1', usuario: { id: 1, nome: 'João Silva' } as any, dataEntrega: new Date('2026-01-17'), atividade: this.mockAtividadesObrigatorias[1], atraso: false, entregue: true, link: [] },
    { id: 2, observacoes: 'Boa organização', linkEntrega: 'https://github.com/aluno/projeto-obrigatorio-2', usuario: { id: 2, nome: 'Maria Santos' } as any, dataEntrega: new Date('2026-01-21'), atividade: this.mockAtividadesObrigatorias[3], atraso: false, entregue: true, link: [] }
  ]

  private getMockLiberacoesFiltradas(idTurma: number, idModulo: number, liberar: boolean) {
    return this.mockAtividadesLiberadas
      .filter(item => item.turma.id === Number(idTurma) && item.atividade.modulo.id === Number(idModulo) && item.liberar === liberar)
      .map(item => ({ ...item, check: false }))
  }

  postAtividade(atividade: AtividadeObrigatoria) {
    if (environment.useMockServices) {
      const novaAtividade = { ...atividade, id: this.mockAtividadesObrigatorias.length + 1, entrega: [], entregaOk: false, check: false } as AtividadeObrigatoria
      this.mockAtividadesObrigatorias.push(novaAtividade)
      return of(novaAtividade).pipe(delay(this.simulateDelay))
    }
    return this.http.post(`${environment.server}${environment.port}/atividades-obrigatorias`, atividade, this.token)
  }

  getAllAtividadesByModulo(idModulo: number) {
    if (environment.useMockServices) {
      return of(this.mockAtividadesObrigatorias.filter(item => item.modulo.id === Number(idModulo))).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/atividades-obrigatorias/mudulo/${idModulo}`, this.token)
  }

  getByIdEntregaObg(idEntrega: number) {
    if (environment.useMockServices) {
      return of(this.mockEntregasObrigatorias.find(item => item.id === Number(idEntrega))).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/entrega-obrigatoria/${idEntrega}`, this.token)
  }
  deletetByIdEntregaObg(idEntrega: number) {
    if (environment.useMockServices) {
      const index = this.mockEntregasObrigatorias.findIndex(item => item.id === Number(idEntrega))
      if (index > -1) {
        const [entrega] = this.mockEntregasObrigatorias.splice(index, 1)
        this.mockAtividadesObrigatorias.forEach(atividade => {
          atividade.entrega = (atividade.entrega || []).filter(item => item.id !== entrega.id)
        })
      }
      return of({ message: 'Entrega obrigatória removida' }).pipe(delay(this.simulateDelay))
    }
    return this.http.delete(`${environment.server}${environment.port}/entrega-obrigatoria/${idEntrega}`, this.token)
  }


  getCamada(idAtividade: number) {
    if (environment.useMockServices) {
      return of([
        { id: 1, camada: 'controller' },
        { id: 2, camada: 'service' },
        { id: 3, camada: 'repository' }
      ]).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/entrega-obrigatoria/camada/${idAtividade}`, this.token)
  }

  getAllByAtividadeLiberada(idTurma: number, idModulo: number) {
    if (environment.useMockServices) {
      return of(this.getMockLiberacoesFiltradas(idTurma, idModulo, true)).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/atividade-obrigatoria-disponivel/turma/liberada/${idTurma}/${idModulo}`, this.token)
  }

  getAllByAtividadeLiberadaLista(idTurma: number, idModulo: number) {
    if (environment.useMockServices) {
      const atividades = this.getMockLiberacoesFiltradas(idTurma, idModulo, true).map(item => {
        const atividade = item.atividade
        atividade.entrega = this.mockEntregasObrigatorias.filter(entrega => entrega.atividade.id === atividade.id)
        return atividade
      })
      return of(atividades).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/atividade-obrigatoria-disponivel/turma/liberada-list/${idTurma}/${idModulo}`, this.token)
  }

  getAllByAtividadeLiberadaListaByCombo(idTurma: number, idModulo: number) {
    if (environment.useMockServices) {
      return this.getAllByAtividadeLiberadaLista(idTurma, idModulo)
    }
    return this.http.get(`${environment.server}${environment.port}/atividade-obrigatoria-disponivel/turma/liberada-list/${idTurma}/${idModulo}/By-Combo`, this.token)
  }

  getAllByAtividadeNaoLiberada(idTurma: number, idModulo: number) {
    if (environment.useMockServices) {
      return of(this.getMockLiberacoesFiltradas(idTurma, idModulo, false)).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/atividade-obrigatoria-disponivel/turma/nao-liberada/${idTurma}/${idModulo}`, this.token)
  }

  getAllByAtividadeNaoLiberadaByCombo(idTurma: number, idModulo: number) {
    if (environment.useMockServices) {
      return this.getAllByAtividadeNaoLiberada(idTurma, idModulo)
    }
    return this.http.get(`${environment.server}${environment.port}/atividade-obrigatoria-disponivel/turma/nao-liberada/${idTurma}/${idModulo}/By-Combo`, this.token)
  }

  putLiberarAtividade(atividade: AtividadeLiberada[]) {
    if (environment.useMockServices) {
      atividade.forEach(item => {
        const index = this.mockAtividadesLiberadas.findIndex(existing => existing.id === item.id)
        if (index > -1) {
          const isLiberar = !!item.liberar
          this.mockAtividadesLiberadas[index].liberar = isLiberar
          this.mockAtividadesLiberadas[index].entrega = isLiberar ? (item.entrega || new Date('2026-01-30')) : null
          this.mockAtividadesLiberadas[index].atividade.dataEntrega = this.mockAtividadesLiberadas[index].entrega
        }
      })
      return of(atividade).pipe(delay(this.simulateDelay))
    }
    return this.http.put(`${environment.server}${environment.port}/atividade-obrigatoria-disponivel/all`, atividade, this.token)
  }

  getAllByAtividadeByTurma(idTurma: number, isLiberada: boolean) {
    if (environment.useMockServices) {
      return of(this.mockAtividadesLiberadas.filter(item => item.turma.id === Number(idTurma) && item.liberar === isLiberada)).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/atividade-obrigatoria-disponivel/turma/${idTurma}/${isLiberada}`, this.token)
  }

  getAllAtividadeByTurmaAndUser(idTurma: number, idUser: number) {
    if (environment.useMockServices) {
      const atividades = this.mockAtividadesLiberadas
        .filter(item => item.turma.id === Number(idTurma) && item.liberar)
        .map(item => {
          const atividade = item.atividade
          atividade.entrega = this.mockEntregasObrigatorias.filter(entrega => entrega.atividade.id === atividade.id && entrega.usuario.id === Number(idUser))
          return atividade
        })
      return of(atividades).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/atividade-obrigatoria-disponivel/turma/${idTurma}/${idUser}`, this.token)
  }

  deleteAtividade(id: number){
    if (environment.useMockServices) {
      this.mockAtividadesObrigatorias = this.mockAtividadesObrigatorias.filter(item => item.id !== Number(id))
      this.mockAtividadesLiberadas = this.mockAtividadesLiberadas.filter(item => item.atividade.id !== Number(id))
      this.mockEntregasObrigatorias = this.mockEntregasObrigatorias.filter(item => item.atividade.id !== Number(id))
      return of({ message: 'Atividade obrigatória removida' }).pipe(delay(this.simulateDelay))
    }
    return this.http.delete(`${environment.server}${environment.port}/atividades-obrigatorias/${id}`, this.token)
  }

  getAtividadeById(id: number){
    if (environment.useMockServices) {
      return of(this.mockAtividadesObrigatorias.find(item => item.id === Number(id))).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/atividades-obrigatorias/${id}`, this.token)
  }

  putAtividade(atividade: AtividadeObrigatoria){
    if (environment.useMockServices) {
      const index = this.mockAtividadesObrigatorias.findIndex(item => item.id === atividade.id)
      if (index > -1) {
        this.mockAtividadesObrigatorias[index] = atividade
      }
      return of(atividade).pipe(delay(this.simulateDelay))
    }
    return this.http.put(`${environment.server}${environment.port}/atividades-obrigatorias`, atividade, this.token)
  }


  //Módulos

  getAllModulos() {
    if (environment.useMockServices) {
      return of([
        { id: 1, descricao: 'Angular Base' },
        { id: 2, descricao: 'Angular Intermediário' },
        { id: 3, descricao: 'Back-end' },
        { id: 4, descricao: 'Projeto' }
      ]).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/modulo`, this.token);
  }

  getByIdModulo(id: number) {
    if (environment.useMockServices) {
      return of({ id, descricao: `Módulo ${id}` }).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/modulo/${id}`, this.token);
  }

  //Entregas

  getAllEntregas() {
    if (environment.useMockServices) {
      return of(this.mockEntregasObrigatorias).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/entrega-obrigatoria`, this.token);
  }

  getByIdEntrega(idEntrega: number) {
    if (environment.useMockServices) {
      return of(this.mockEntregasObrigatorias.find(item => item.id === Number(idEntrega))).pipe(delay(this.simulateDelay))
    }
      return this.http.get(`${environment.server}${environment.port}/entrega-obrigatoria/${idEntrega}`, this.token);
  }

  postEntrega(entrega: EntregasObrigatorias) {
    if (environment.useMockServices) {
      const novaEntrega = {
        ...entrega,
        id: this.mockEntregasObrigatorias.length + 1,
        dataEntrega: new Date(),
        observacoes: entrega.observacoes || 'Entrega enviada'
      } as EntregasObrigatorias
      this.mockEntregasObrigatorias.push(novaEntrega)
      return of([
        { camada: 'controller', feedback: 'Correto: ' },
        { camada: 'service', feedback: 'Correto: ' },
        { camada: 'repository', feedback: 'Correto: ' }
      ]).pipe(delay(this.simulateDelay))
    }
    return this.http.post(`${environment.server}${environment.port}/entrega-obrigatoria`, entrega, this.token);
  }

  getByIdParticipanteEAtividade(idUser: number) {
    if (environment.useMockServices) {
      return of(this.mockEntregasObrigatorias.filter(item => item.usuario.id === Number(idUser))).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/entrega-obrigatoria/participante/${idUser}`, this.token);
  }

  putEntrega(entrega: EntregasObrigatorias) {
    if (environment.useMockServices) {
      const index = this.mockEntregasObrigatorias.findIndex(item => item.id === entrega.id)
      if (index > -1) {
        this.mockEntregasObrigatorias[index] = entrega
      }
      return of(entrega).pipe(delay(this.simulateDelay))
    }
    return this.http.put(`${environment.server}${environment.port}/entrega-obrigatoria`, entrega, this.token);
  }

  // Turma

  getByIdTurma(id: number) {
    if (environment.useMockServices) {
      return of({ id, descricao: `Turma ${id}` }).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/turma/${id}`, this.token);
  }

  getAllTurma() {
    if (environment.useMockServices) {
      return of(this.mockTurmas).pipe(delay(this.simulateDelay))
    }
    return this.http.get(`${environment.server}${environment.port}/turma/`, this.token);
  }



}
