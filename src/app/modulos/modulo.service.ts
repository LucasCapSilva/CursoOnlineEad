import { Barometro } from './../model/Barometro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Modulo } from '../model/Modulo';
import { UploadVideo } from '../model/UploadVideo';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  };

  constructor(private router: Router, private http: HttpClient) { }

  private mockModulosByBloco: { [key: number]: any[] } = {
    1: [
      { id: 1, descricao: 'Scrum', subdescricao: 'Metodologia Ágil Scrum', linkIcone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
      { id: 2, descricao: 'Lógica', subdescricao: 'Lógica de Programação', linkIcone: 'https://img.icons8.com/color/144/flow-chart.png' },
      { id: 3, descricao: 'Java', subdescricao: 'Linguagem Java', linkIcone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' }
    ],
    2: [
      { id: 4, descricao: 'MySql', subdescricao: 'Banco de Dados MySql', linkIcone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg' },
      { id: 5, descricao: 'Spring', subdescricao: 'Framework Spring', linkIcone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { id: 6, descricao: 'Android', subdescricao: 'Desenvolvimento Android', linkIcone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' }
    ],
    3: [
      { id: 7, descricao: 'Fund. Web', subdescricao: 'Fundamentos Web', linkIcone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { id: 8, descricao: 'Angular', subdescricao: 'Angular Frontend', linkIcone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { id: 9, descricao: 'React', subdescricao: 'React Frontend', linkIcone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
    ],
    4: [
      { id: 45, descricao: 'T-0-Modulo-1', subdescricao: 'Trilha Zero - Fundamentos', linkIcone: 'https://img.icons8.com/color/144/compass--v1.png' },
      { id: 47, descricao: 'T-0-Modulo-2', subdescricao: 'Trilha Zero - Organização', linkIcone: 'https://img.icons8.com/color/144/todo-list--v1.png' },
      { id: 48, descricao: 'T-0-Modulo-3', subdescricao: 'Trilha Zero - Carreira', linkIcone: 'https://img.icons8.com/color/144/conference-call--v1.png' }
    ]
  };

  private buildMockAulasByModulo(moduloId: number): UploadVideo[] {
    const temas: { [key: number]: string } = {
      1: 'Scrum',
      2: 'Lógica',
      3: 'Java',
      4: 'MySql',
      5: 'Spring',
      6: 'Android',
      7: 'Fund. Web',
      8: 'Angular',
      9: 'React',
      45: 'Trilha Zero',
      47: 'Trilha Zero',
      48: 'Trilha Zero'
    };

    const tema = temas[moduloId] || 'Módulo';
    const modulo = { id: moduloId, descricao: tema, curso: 'Mock', aulas: [] } as Modulo;

    return [
      {
        id: (moduloId * 100) + 1,
        titulo: `${tema} - Aula 1`,
        descricao: `Introdução de ${tema}`,
        linkVideo: 'https://filesamples.com/samples/video/mkv/sample_640x360.mkv',
        linkGitHub: 'https://github.com/',
        linkDrive: 'https://drive.google.com/',
        num_sequencia: 1,
        modulo: modulo,
        questao: [],
        liberado: true
      },
      {
        id: (moduloId * 100) + 2,
        titulo: `${tema} - Aula 2`,
        descricao: `Conceitos intermediários de ${tema}`,
        linkVideo: 'https://filesamples.com/samples/video/mkv/sample_960x400_ocean_with_audio.mkv',
        linkGitHub: 'https://github.com/',
        linkDrive: 'https://drive.google.com/',
        num_sequencia: 2,
        modulo: modulo,
        questao: [],
        liberado: true
      },
      {
        id: (moduloId * 100) + 3,
        titulo: `${tema} - Aula 3`,
        descricao: `Prática de ${tema}`,
        linkVideo: 'https://filesamples.com/samples/video/mkv/sample_640x360.mkv',
        linkGitHub: 'https://github.com/',
        linkDrive: 'https://drive.google.com/',
        num_sequencia: 3,
        modulo: modulo,
        questao: [],
        liberado: true
      }
    ];
  }

  showVideoAulas(temaAula: string, cor: string) {
    if (environment.useMockServices) {
      this.router.navigate(['/conteudo-um/1']);
      return;
    }
     // Trilha zero
     if (temaAula === 'trilha-zero') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'T-0-Modulo-1') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'T-0-Modulo-2') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'T-0-Modulo-3') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'T-0-Modulo-4') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'T-0-Modulo-5') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'T-0-Modulo-6') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'T-0-Modulo-7') {
      this.router.navigate(['/conteudo-um/1']);
    }
    // Módulo I
    if (temaAula === 'Scrum') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'Lógica') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'Java') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'Kotlin') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'SQL Server') {
      this.router.navigate(['/conteudo-um/1']);
    }
    // Módulo II
    if (temaAula === 'MySql') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'Spring') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'Android') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'NestJS') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'MySQL') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === '.NET') {
      this.router.navigate(['/conteudo-um/1']);
    }
    // Módulo III

    if (temaAula === 'Fund. Web') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'Angular') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'React') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'Android') {
      this.router.navigate(['/conteudo-um/1']);
    }
    if (temaAula === 'Docker p.2') {
      this.router.navigate(['/conteudo-um/1']);
    }
  }


  getAllAulas() {
    if (environment.useMockServices) {
      const aulas = Object.keys(this.mockModulosByBloco)
        .map((blocoId) => this.mockModulosByBloco[Number(blocoId)])
        .reduce((acc, value) => acc.concat(value), [])
        .map((modulo) => this.buildMockAulasByModulo(modulo.id))
        .reduce((acc, value) => acc.concat(value), []);
      return of(aulas).pipe(delay(200));
    }
    return this.http.get('http://31.220.57.121:8060/aula', this.token);
  }

  getByName(name: string) {
    if (environment.useMockServices) {
      const aulas = this.buildMockAulasByModulo(environment.idModulo || 1).filter((item) =>
        item.titulo.toLowerCase().includes(name.toLowerCase())
      );
      return of(aulas).pipe(delay(200));
    }
    return this.http.get(`http://31.220.57.121:8060/aula/name/${name}`, this.token);
  }

  getIdModulo(idModulo: number, idTurma: number, idAluno: number) {
    if (environment.useMockServices) {
      const tema = `Módulo ${idModulo}`;
      const modulo: Modulo = {
        id: idModulo,
        descricao: tema,
        curso: 'Mock',
        aulas: this.buildMockAulasByModulo(idModulo)
      };
      return of(modulo).pipe(delay(200));
    }
    return this.http.get(`http://31.220.57.121:8060/modulo/liberada/${idModulo}/${idTurma}/${idAluno}`, this.token);
  }

  getModuloByIdByCursoByBloco(idCurso: number, idBloco: number) {
    if (environment.useMockServices) {
      const modulos = this.mockModulosByBloco[idBloco] || [];
      return of(modulos).pipe(delay(200));
    }
    return this.http.get(`http://31.220.57.121:8060/modulo/bloco-modulo/${idCurso}/${idBloco}`, this.token);
  }

  getAllModulos() {
    if (environment.useMockServices) {
      const modulos = Object.keys(this.mockModulosByBloco)
        .map((key) => this.mockModulosByBloco[Number(key)])
        .reduce((acc, value) => acc.concat(value), []);
      return of(modulos).pipe(delay(200));
    }
    return this.http.get('http://31.220.57.121:8060/modulo', this.token);
  }

  getIdAulas(idAula: number, numSeq: number) {
    if (environment.useMockServices) {
      const aulas = this.buildMockAulasByModulo(idAula);
      const aula = aulas.find((item) => item.num_sequencia === numSeq) || aulas[0];
      environment.idAula = aula.id;
      return of(aula).pipe(delay(200));
    }
    return this.http.get(`http://31.220.57.121:8060/aula/mod/${idAula}/${numSeq}`, this.token);
  }

  postBarometro(barometro: Barometro) {
    if (environment.useMockServices) {
      return of({ ...barometro, id: Date.now() }).pipe(delay(200));
    }
    return this.http.post('http://31.220.57.121:8060/barometro', barometro, this.token);
  }


}
