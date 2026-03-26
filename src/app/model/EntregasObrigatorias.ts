import { AtividadeObrigatoria } from './AtividadeObrigatoria';
import { User } from './User';

export class EntregasObrigatorias {
  public id: number;
  public observacoes: string;
  public linkEntrega: string;
  public usuario: User;
  public dataEntrega: Date;
  public atividade: AtividadeObrigatoria;
  public atraso: boolean;
  public entregue: boolean;
  public link:any;
  
}
