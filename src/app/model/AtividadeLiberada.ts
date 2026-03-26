import { Turma } from './Tuma';
import { AtividadeObrigatoria } from './AtividadeObrigatoria';

export class AtividadeLiberada {
  public id: number
  public atividade: AtividadeObrigatoria
  public turma: Turma
  public liberar: boolean
  public entrega: Date
  public check: boolean
}
