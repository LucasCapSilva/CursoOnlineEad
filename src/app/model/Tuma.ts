import { Curso } from './Curso';
import { User } from './User';
import { TipoTurma } from './TipoTurma';

export class Turma {

  public id:number
  public descricao: string
  public tipoTurma: TipoTurma
  public users: User[]
  public curso: Curso;
}
