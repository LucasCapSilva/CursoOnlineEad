import { DiarioBordo } from './DiarioBordo';
import { User } from 'src/app/model/User';

export class UserInfo {

  public id:number
  public user:User
  public idade: number
  public escolariedade: string
  public diversidade: string
  public racial: string
  public experienciaTec: boolean
  public diarioBordo: DiarioBordo
}
