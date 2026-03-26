import { DemandasBemEstar } from './DemandasBemEstar';
import { Curso } from './Curso';
import { Turma } from './Tuma';
import { User } from './User';

export class FormBemEstarPos{
  public id: number
  public assistenteSocial: User
  public curso: Curso
  public turma: Turma
  public user: User
  public data: Date
  public solicitante: string
  public nivelUrgencia: string
  public descricao: string
  public demandas: DemandasBemEstar
  public duracao: number
}
