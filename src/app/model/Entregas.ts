import { Atividade } from './Atividade';
import { User } from './User';
export class Entregas {
  public id: number;
  public observacoes: string;
  public linkEntrega: string;
  public usuario: User;
  public dataEntrega: Date;
  public atividade: Atividade;
  public atraso: boolean;
  public entregaOk: boolean;
}
