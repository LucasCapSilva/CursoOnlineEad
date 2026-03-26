import { User } from './User';
import { DiarioBordo } from './DiarioBordo';
export class Passagem {

    public id:number
    public data: Date
    public blocoDe: any
    public blocoPara: any
    public relato: string;
    public nivel: string;
    public diarioBordo : DiarioBordo;
    public relator: User;
  }
  