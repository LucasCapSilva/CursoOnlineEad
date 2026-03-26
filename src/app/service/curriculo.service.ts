import { Curriculo } from './../model/Curriculo';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurriculoService {

  baseUrl: string = `${environment.server}${environment.port}/Curriculo`

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set
    ('Authorization', environment.token)
  }

  getByDuvidaEmpregabilidade(usuarioId: number,mensage:string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Duvida?usuarioId=${usuarioId}&mensage=${mensage}`, this.token);
  }
  // buscas especificas curriculo

  getByTurmaCurriculo(id: number): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Turma/${id}`, this.token);
  }

  getByGenero(genero: string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Curriculo-Genero/{genero}?genero=${genero}`, this.token);
  }

  getByIsPcd(isPcd: boolean): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Curriculo-Pcd/{isPcd}?isPcd=${isPcd}`, this.token);
  }

  getByRaca(raca: string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Curriculo-Raca/{raca}?raca=${raca}`, this.token);
  }

  getByTypePcd(typePcd: string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Curriculo-Tipopcd/{typePcd}?typePcd=${typePcd}`, this.token);
  }


  getByTecnicaCurriculo(descricao: string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Tecnico?descricao=${descricao}`, this.token);
  }

  getByProfissionalCurriculo(cargo: string,principaisAtividades:string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Profissional?cargo=${cargo}&principaisAtividades=${principaisAtividades}`, this.token);
  }

  getByPortifolioCurriculo(nomeProjeto: string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Portifolio?portifolio=${nomeProjeto}`, this.token);
  }
  getAllCurriculoByTurmaIdAndNumPi(turmaId: number, numeroPi: number): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(`${this.baseUrl}/curriculo/numpi/${numeroPi}/turmaid/${turmaId}`, this.token);
  }

  getByIdiomaCurriculo(idioma: string, nivel: string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Idioma?idioma=${idioma}&nivel=${nivel}`, this.token);
  }

  getByEducacaoCurriculo(curso: string): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/Educacao?curso=${curso}`, this.token);
  }

  // buscas especificas curriculo
  getAllCurriculo(): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(this.baseUrl, this.token);
  }

  getByIdCurriculo(id: number): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/${id}`, this.token);
  }

  getByUserCurriculo(id: number): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.baseUrl}/User/${id}`, this.token);
  }


  postCurriculo(curriculo: Curriculo): Observable<Curriculo>{
    return this.http.post<Curriculo>(`${this.baseUrl}`, curriculo, this.token)
  }

  putCurriculo(curriculo: Curriculo): Observable<Curriculo>{
    return this.http.put<Curriculo>(`${this.baseUrl}`, curriculo, this.token)
  }

  deleteCurriculo(id: number){
    this.http.delete(`${this.baseUrl}/${id}`)
  }

  temCurriculo(){
    let ok = false
    const curriculo = environment.hasCurriculo
    if(curriculo == true){
      ok = true
    }
    return ok
  }

}
