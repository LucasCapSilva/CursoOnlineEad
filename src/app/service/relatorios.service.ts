import { PercentEntregasObr } from './../model/PercentEntregasObr';
import { PercentEntregas } from './../model/PercentEntregas';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  private mockTurmas = [
    { id: 1, descricao: 'Turma A' },
    { id: 2, descricao: 'Turma B' },
    { id: 8, descricao: 'Ex-Participantes' }
  ];

  private mockBarometro = [
    {
      id: 1,
      data: new Date('2026-03-20'),
      usuario: { id: 1, nome: 'João Silva', turma: { id: 1, descricao: 'Turma A' } },
      aula: { id: 1, titulo: 'Introdução ao Angular' },
      score: 9,
      cor: 'VERDE'
    },
    {
      id: 2,
      data: new Date('2026-03-21'),
      usuario: { id: 2, nome: 'Maria Santos', turma: { id: 1, descricao: 'Turma A' } },
      aula: { id: 2, titulo: 'Componentes e Templates' },
      score: 7,
      cor: 'AMARELO'
    },
    {
      id: 3,
      data: new Date('2026-03-22'),
      usuario: { id: 3, nome: 'Pedro Oliveira', turma: { id: 2, descricao: 'Turma B' } },
      aula: { id: 3, titulo: 'Serviços e Injeção de Dependência' },
      score: 4,
      cor: 'VERMELHO'
    }
  ];

  private mockEntregas = [
    { id: 1, nome: 'João Silva', turma: 'Turma A', data: '2026-03-20', entregas: 9, atividades: 10, percent: 90 },
    { id: 2, nome: 'Maria Santos', turma: 'Turma A', data: '2026-03-20', entregas: 8, atividades: 10, percent: 80 },
    { id: 3, nome: 'Pedro Oliveira', turma: 'Turma B', data: '2026-03-20', entregas: 6, atividades: 10, percent: 60 }
  ];

  private mockEntregasObrigatorias = [
    { id: 1, nome: 'João Silva', turma: 'Turma A', data: '2026-03-20', entregas: 5, atividades: 6, percent: 83.33 },
    { id: 2, nome: 'Maria Santos', turma: 'Turma A', data: '2026-03-20', entregas: 4, atividades: 6, percent: 66.67 },
    { id: 3, nome: 'Pedro Oliveira', turma: 'Turma B', data: '2026-03-20', entregas: 3, atividades: 6, percent: 50 }
  ];

  private mockSolicitacoes = [
    { descricao: 'Turma A', percent: 42.5, qtd: 17 },
    { descricao: 'Turma B', percent: 35.2, qtd: 13 }
  ];

  private mockUrgencias = [
    { descricao: 'Alta', percent: 30.5, qtd: 9 },
    { descricao: 'Média', percent: 46.7, qtd: 14 },
    { descricao: 'Baixa', percent: 22.8, qtd: 7 }
  ];

  private mockPosAtendimento = [
    { descricao: 'Turma A', percent: 54.3, qtd: 19 },
    { descricao: 'Turma B', percent: 45.7, qtd: 16 }
  ];

  private mockDemandasRelatorio = {
    descricao: 'Demandas por turma',
    administrativo: 4,
    apoioInternetNotebook: 6,
    ausencias: 3,
    comportamental: 2,
    beneficios: 2,
    conflitoEntreParticipantes: 1,
    desistencia: 1,
    emocional: 5,
    engajamento: 3,
    empregabilidade: 2,
    presenca: 4,
    problemasEducacionais: 3,
    problemasTecnicos: 5,
    saude: 1,
    saudeMental: 4,
    socioeconomico: 2,
    sociofamiliar: 2,
    violenciaDeGenero: 0,
    violenciaUrbana: 1,
    mapeamentoVunerabilidade: 2,
    covid: 0,
    outros: 1
  };

  private mockAtendimentosUsuario = [
    {
      id: 1,
      data: new Date('2026-03-19'),
      solicitante: 'Participante',
      nivelUrgencia: 'MÉDIA',
      descricao: 'Acompanhamento social',
      duracao: 45,
      user: { id: 1, nome: 'João Silva', turma: { id: 1, descricao: 'Turma A' } },
      turma: { id: 1, descricao: 'Turma A' },
      curso: { id: 1, descricao: 'FullStack Java e React' },
      assistenteSocial: { id: 10, nome: 'Ana Técnica' },
      demandas: { id: 1, descricao: 'Socioemocional' }
    },
    {
      id: 2,
      data: new Date('2026-03-21'),
      solicitante: 'Instrutor',
      nivelUrgencia: 'ALTA',
      descricao: 'Intervenção por ausência',
      duracao: 60,
      user: { id: 2, nome: 'Maria Santos', turma: { id: 1, descricao: 'Turma A' } },
      turma: { id: 1, descricao: 'Turma A' },
      curso: { id: 1, descricao: 'FullStack Java e React' },
      assistenteSocial: { id: 10, nome: 'Ana Técnica' },
      demandas: { id: 2, descricao: 'Presença' }
    }
  ];

  private getTurmaDescricao(idTurma?: number): string {
    const turma = this.mockTurmas.find(item => item.id === idTurma);
    return turma ? turma.descricao : '';
  }

  private buildPercentResponse(entregas: any[]): PercentEntregas {
    const qtdAtividades = entregas.reduce((acc, item) => acc + item.atividades, 0);
    const qtdEntregas = entregas.reduce((acc, item) => acc + item.entregas, 0);
    const percentEntregas = qtdAtividades > 0 ? Number(((qtdEntregas / qtdAtividades) * 100).toFixed(2)) : 0;
    return { qtdAtividades, qtdEntregas, percentEntregas };
  }


  getAllBarometro() {
    if (environment.useMockServices) {
      return of(this.mockBarometro).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/barometro`, this.token);
  }

  getByIdBarometro(id: number) {
    if (environment.useMockServices) {
      const item = this.mockBarometro.find(barometro => (barometro as any).id === id) || this.mockBarometro[0];
      return of(item).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/barometro/${id}`, this.token);
  }


  getByFilter(nome?: string, idTurma?: number, cor?: string, dataIn?: string, dataFim?: string) {

    if (nome == undefined) {
      nome = '';
    }
    if (cor == undefined) {
      cor = '';
    }
    if (dataIn == undefined) {
      dataIn = '';
    }
    if (dataFim == undefined) {
      dataFim = '';
    }
    if (idTurma == undefined) {
      idTurma = 0;
    }

    if (environment.useMockServices) {
      const result = this.mockBarometro.filter(item => {
        const byNome = !nome || item.usuario.nome.toLowerCase().includes(nome.toLowerCase());
        const byCor = !cor || item.cor.toLowerCase() === cor.toLowerCase();
        const byTurma = !idTurma || item.usuario.turma.id === idTurma;
        return byNome && byCor && byTurma;
      });
      return of(result).pipe(delay(500));
    }

    return this.http.get(`${environment.server}${environment.port}/barometro/filter?cor=${cor}&nome=${nome}&dataIn=${dataIn}&dataFim=${dataFim}&idTurma=${idTurma}`, this.token);
  }

  getByIdTurma(id: number) {
    if (environment.useMockServices) {
      const turma = this.mockTurmas.find(item => item.id === id) || { id, descricao: `Turma ${id}` };
      return of(turma).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/${id}`, this.token);
  }

  getAllTurma() {
    if (environment.useMockServices) {
      return of(this.mockTurmas).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/`, this.token);
  }

  getAllTurmaCombo(){
    if (environment.useMockServices) {
      return of(this.mockTurmas).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/turma/By-Combo`, this.token)
  }


  getByFilterEntregas(data?: string, idTurma?: number, nome?: string) {

    if (nome == undefined) {
      nome = '';
    }
    if (data == undefined) {
      data = '';
    }
    if (idTurma == undefined) {
      idTurma = 0;
    }

    if (environment.useMockServices) {
      const turmaDescricao = this.getTurmaDescricao(idTurma);
      const result = this.mockEntregas.filter(item => {
        const byNome = !nome || item.nome.toLowerCase().includes(nome.toLowerCase());
        const byData = !data || item.data === data;
        const byTurma = !idTurma || item.turma === turmaDescricao;
        return byNome && byData && byTurma;
      });
      return of(result).pipe(delay(500));
    }

    return this.http.get(`${environment.server}${environment.port}/entrega/filter?data=${data}&idTurma=${idTurma}&nome=${nome}`, this.token);
  }

  getByEntregasTotal(idUser?: number, idTurma?: number) {

    if (idUser == undefined) {
      idUser = 0;
    }
    if (idTurma == undefined) {
      idTurma = 0;
    }

    if (environment.useMockServices) {
      const turmaDescricao = this.getTurmaDescricao(idTurma);
      const entregas = this.mockEntregas.filter(item => {
        const byUser = !idUser || item.id === idUser;
        const byTurma = !idTurma || item.turma === turmaDescricao;
        return byUser && byTurma;
      });
      return of(this.buildPercentResponse(entregas)).pipe(delay(500));
    }

    return this.http.get(`${environment.server}${environment.port}/entrega/percents?idUser=${idUser}&idTurma=${idTurma}`, this.token);
  }


  getByFilterEntregasObr(data?: string, idTurma?: number, nome?: string) {

    if (nome == undefined) {
      nome = '';
    }
    if (data == undefined) {
      data = '';
    }
    if (idTurma == undefined) {
      idTurma = 0;
    }

    if (environment.useMockServices) {
      const turmaDescricao = this.getTurmaDescricao(idTurma);
      const result = this.mockEntregasObrigatorias.filter(item => {
        const byNome = !nome || item.nome.toLowerCase().includes(nome.toLowerCase());
        const byData = !data || item.data === data;
        const byTurma = !idTurma || item.turma === turmaDescricao;
        return byNome && byData && byTurma;
      });
      return of(result).pipe(delay(500));
    }

    return this.http.get(`${environment.server}${environment.port}/entrega-obrigatoria/filter?data=${data}&idTurma=${idTurma}&nome=${nome}`, this.token);
  }

  getByEntregasTotalObr(idUser?: number, idTurma?: number) {

    if (idUser == undefined) {
      idUser = 0;
    }
    if (idTurma == undefined) {
      idTurma = 0;
    }

    if (environment.useMockServices) {
      const turmaDescricao = this.getTurmaDescricao(idTurma);
      const entregas = this.mockEntregasObrigatorias.filter(item => {
        const byUser = !idUser || item.id === idUser;
        const byTurma = !idTurma || item.turma === turmaDescricao;
        return byUser && byTurma;
      });
      return of(this.buildPercentResponse(entregas) as PercentEntregasObr).pipe(delay(500));
    }

    return this.http.get(`${environment.server}${environment.port}/entrega-obrigatoria/percents?idUser=${idUser}&idTurma=${idTurma}`, this.token);
  }

  exerciciosPendentes(){
    let total = environment.entregaPendente + environment.entregaPendenteOb
    return total
  }

  // Relatórios de bem estar

    // Solicitações

  getSolicitacaoByDataETurma(idTurma?: number, dataIn?: string, dataFim?: string) {
    if (environment.useMockServices) {
      const turmaDescricao = this.getTurmaDescricao(idTurma);
      const result = this.mockSolicitacoes.find(item => item.descricao === turmaDescricao) || { descricao: turmaDescricao || 'Turma', percent: 0, qtd: 0 };
      return of(result).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-form-solicitaco/relatorio-turma/idTurma?idTurma=${idTurma}&in=${dataIn}&end=${dataFim}`, this.token);
  }

  getAllSolicitacaoByData(dataIn?: string, dataFim?: string) {
    if (environment.useMockServices) {
      return of(this.mockSolicitacoes).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-form-solicitaco/relatorio-turma?in=${dataIn}&end=${dataFim}`, this.token);
  }

  getUrgenciaByDataETurma(idTurma?: number, dataIn?: string, dataFim?: string) {
    if (environment.useMockServices) {
      const result = this.mockUrgencias[0];
      return of(result).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-form-solicitaco/relatorio-prioridade/idTurma?idTurma=${idTurma}&in=${dataIn}&end=${dataFim}`, this.token);
  }

  getAllUrgenciacaoByData(dataIn?: string, dataFim?: string) {
    if (environment.useMockServices) {
      return of(this.mockUrgencias).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-form-solicitaco/relatorio-prioridade?in=${dataIn}&end=${dataFim}`, this.token);
  }

  getSolicitacoesByDataEUser(idUser?: number, dataIn?: string, dataFim?: string) {
    if (environment.useMockServices) {
      return of({ descricao: 'Participante', percent: 55.4, qtd: 12 }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-form-solicitaco/relatorio-usuario/idUsuario?idUsuario=${idUser}&in=${dataIn}&end=${dataFim}`, this.token);
  }


  // Pós atendimento

  getPosByTurma(idTurma?:number, dataIn?: string, dataFim?: string){
    if (environment.useMockServices) {
      const turmaDescricao = this.getTurmaDescricao(idTurma);
      const result = this.mockPosAtendimento.find(item => item.descricao === turmaDescricao) || { descricao: turmaDescricao || 'Turma', percent: 0, qtd: 0 };
      return of(result).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/turma-data?idTurma=${idTurma}&in=${dataIn}&end=${dataFim}`, this.token)
  }

  getAllPosByData(dataIn?: string, dataFim?: string){
    if (environment.useMockServices) {
      return of(this.mockPosAtendimento).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/data?in=${dataIn}&end=${dataFim}`, this.token)
  }

  getSolicitacoesByArea(dataIn: string, dataFim: string){
    if (environment.useMockServices) {
      return of([
        { descricao: 'Pedagógico', percent: 38.1, qtd: 8 },
        { descricao: 'Social', percent: 33.3, qtd: 7 },
        { descricao: 'Empregabilidade', percent: 28.6, qtd: 6 }
      ]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/departamento-data?in=${dataIn}&end=${dataFim}`, this.token)
  }

  getVulnerabilidadeByTurmaEData(idTurma?:number, dataIn?: string, dataFim?: string){
    if (environment.useMockServices) {
      return of({ descricao: 'Vulnerabilidade', percent: 27.3, qtd: 6 }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/urgencia-data?idTuma=${idTurma}&in=${dataIn}&end=${dataFim}`, this.token)
  }

  getVulnerabilidadeByData(dataIn?: string, dataFim?: string){
    if (environment.useMockServices) {
      return of([
        { descricao: 'Alta', percent: 21.4, qtd: 3 },
        { descricao: 'Média', percent: 50, qtd: 7 },
        { descricao: 'Baixa', percent: 28.6, qtd: 4 }
      ]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/urgencia?in=${dataIn}&end=${dataFim}`, this.token)

  }

  getAtendimentosByUser(idUser?: number, dataIn?: string, dataFim?: string) {
    if (environment.useMockServices) {
      return of({ descricao: 'Atendimentos no período', percent: 100, qtd: this.mockAtendimentosUsuario.length }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/usuario-data-qtd?idUser=${idUser}&in=${dataIn}&end=${dataFim}`, this.token)
  }

  getPosByUserEData(idUser?: number, dataIn?: string, dataFim?: string) {
    if (environment.useMockServices) {
      return of(this.mockAtendimentosUsuario).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/usuario-data?idUser=${idUser}&in=${dataIn}&end=${dataFim}`, this.token)
  }

  getAllDemandasByData(dataIn?: string, dataFim?: string){
    if (environment.useMockServices) {
      return of([this.mockDemandasRelatorio]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/demandas?in=${dataIn}&end=${dataFim}`, this.token)
  }

  getDemandasByTurmaEData(idTurma?:number, dataIn?: string, dataFim?: string){
    if (environment.useMockServices) {
      return of(this.mockDemandasRelatorio).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/demandas-turma?idTuma=${idTurma}&in=${dataIn}&end=${dataFim}`, this.token)
  }

  getAtendimentoByTecnico(idUser?: number, dataIn?: string, dataFim?: string) {
    if (environment.useMockServices) {
      return of({ descricao: 'Atendimentos do técnico', percent: 100, qtd: 11 }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/tecnico-data-qtd?idUser=${idUser}&in=${dataIn}&end=${dataFim}`, this.token)
  }

  getTempoAtendimentoByTurma(idTurma?:number, dataIn?: string, dataFim?: string){
    if (environment.useMockServices) {
      return of({ descricao: 'Tempo médio por turma (min)', percent: 100, qtd: 52 }).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/tempos-turma?idTurma=${idTurma}&in=${dataIn}&end=${dataFim}`, this.token)
  }

  getAllTempoAtendimentoByTurma(dataIn?: string, dataFim?: string){
    if (environment.useMockServices) {
      return of([
        { descricao: 'Turma A', percent: 100, qtd: 48 },
        { descricao: 'Turma B', percent: 100, qtd: 56 }
      ]).pipe(delay(500));
    }
    return this.http.get(`${environment.server}${environment.port}/bem-estar-from-pos-atendimento/relatorio-atendimento/tempos?in=${dataIn}&end=${dataFim}`, this.token)
  }
// /Relatórios de bem estar
}
