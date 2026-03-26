import { Entregas } from './Entregas';
import { Turma } from './Tuma';
export class Atividade {
  public id: number;
  public titulo: string;
  public atividade: string;
  public linkUtil: string;
  public dataAtividade: Date;
  public dataEntrega: Date;
  public turma: Turma;
  public entrega: Entregas;
  public entregaOk: boolean;
}
