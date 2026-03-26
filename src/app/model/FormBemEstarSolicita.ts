import { Turma } from './Tuma';
import { User } from './User';
export class FormBemEstarSolicita{
  public id: number
  public solicitante: User
  public usuario: User
  public turma: Turma
  public data: Date
  public descricao: string
  public nivelUrgencia: string
  public atendido: User
}

