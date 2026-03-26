import { Turma } from './Tuma';
import { User } from './User';
import { StringifyOptions } from 'querystring';
export class Avisos {
  public id: number;
  public data: string;
  public user: User;
  public turma: Turma;
  public titulo: string;
  public texto: string;
  public link: string;
}
