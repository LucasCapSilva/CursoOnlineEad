import { User } from './User';
import { DiarioBordo } from './DiarioBordo';
export class Relato {

  public id:number
  public data: Date
  public bloco: any;
  public relato: string;
  public nivel: string;
  public diarioBordo : DiarioBordo;
  public relator: User;
}
