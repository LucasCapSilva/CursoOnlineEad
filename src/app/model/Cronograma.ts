import { CronogramaCor } from './CronogramaCor';
import { Turma } from './Tuma';

export class Cronograma {
  public id: number;
  public descricao: string;
  public corRGB: CronogramaCor;
  public date: string;
  public inicio: string;
  public fim: string;
  public turma: Turma;
  public link: string = "teste link 123"
}
