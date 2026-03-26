import { QuestAulaValid } from './../model/QuestAulaValid';
import { UploadVideo } from './../model/UploadVideo';
import { Resposta } from './../model/RespostaAula';
import { QuestaoAula } from './../model/QuestaoAula';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtividadesRevisaoService {

  constructor(private http: HttpClient) { }

  token={ headers: new HttpHeaders().set('Authorization', environment.token) }

  private buildMockAulas(moduloId: number): UploadVideo[] {
    const tema = `Módulo ${moduloId}`;
    return [
      {
        id: (moduloId * 100) + 1,
        titulo: `${tema} - Aula 1`,
        descricao: `Introdução de ${tema}`,
        linkVideo: 'https://filesamples.com/samples/video/mkv/sample_640x360.mkv',
        linkGitHub: 'https://github.com/',
        linkDrive: 'https://drive.google.com/',
        num_sequencia: 1,
        modulo: null,
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
        modulo: null,
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
        modulo: null,
        questao: [],
        liberado: true
      }
    ] as UploadVideo[];
  }

  private buildMockAtividades(userId: number, moduloId: number): QuestAulaValid[] {
    const aulas = this.buildMockAulas(moduloId);
    return aulas.map((aula) => ({
      aula: aula,
      usuario: { id: userId } as any,
      respondido: true,
      liberado: true
    } as QuestAulaValid));
  }

  postQuestao(questao: QuestaoAula){
    return this.http.post(`${environment.server}${environment.port}/checkuforuserquestion`, questao, this.token)
  }

  getByIdQuestao(id: number){
    return this.http.get(`${environment.server}${environment.port}/checkuforuserquestion/${id}`, this.token)
  }

  deleteQuestao(id: number){
    return this.http.delete(`${environment.server}${environment.port}/checkuforuserquestion/${id}`, this.token)
  }

  putQuestao(questao: QuestaoAula){
    return this.http.put(`${environment.server}${environment.port}/checkuforuserquestion`, questao, this.token)
  }


  getByIdResposta(id: number){
    return this.http.get(`${environment.server}${environment.port}/checkuforresp/${id}`, this.token)
  }

  postResposta(resposta: Resposta ){
    return this.http.post(`${environment.server}${environment.port}/checkuforresp`, resposta, this.token)
  }

  putResposta(resposta: Resposta){
    return this.http.put(`${environment.server}${environment.port}/checkuforresp`, resposta, this.token)
  }

  getByIdAula(id: number){
    return this.http.get(`${environment.server}${environment.port}/aula/${id}`, this.token)
  }

  getAulasByAtividade(userId: number, moduloId: number){
    if (environment.useMockServices) {
      return of(this.buildMockAtividades(userId, moduloId)).pipe(delay(150));
    }
    return this.http.get(`${environment.server}${environment.port}/check-for-understanding-valid/user-and-modulo/${userId}/${moduloId}`, this.token)
  }

  getAulasByAtividadByList(userId: number, moduloId: number){
    if (environment.useMockServices) {
      return of(this.buildMockAtividades(userId, moduloId)).pipe(delay(150));
    }
    return this.http.get(`${environment.server}${environment.port}/check-for-understanding-valid/user-and-modulo-by-list/${userId}/${moduloId}`, this.token)
  }

  postRespAtividade(quest: QuestAulaValid){
    if (environment.useMockServices) {
      return of(quest).pipe(delay(150));
    }
    return this.http.post(`${environment.server}${environment.port}/check-for-understanding-valid`, quest, this.token)
  }



}
