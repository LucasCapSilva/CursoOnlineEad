import { EntregasObrigatorias } from './EntregasObrigatorias';
import { Modulo } from './Modulo';

export class AtividadeObrigatoria {
  public id: number;
  public titulo: string;
  public atividade: string;
  public linkUtil: string;
  public dataAtividade: Date;
  public dataEntrega: Date;
  public modulo: Modulo;
  public entrega: EntregasObrigatorias[];
  public entregaOk: boolean;
  public liberacao: Date
  public check: boolean
}
