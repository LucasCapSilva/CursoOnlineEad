import { QuestaoAula } from './QuestaoAula';
import { Modulo } from './Modulo';

export class UploadVideo {

  public id: number;
  public titulo: string;
  public descricao: string;
  public linkVideo: string;
  public linkGitHub: string;
  public linkDrive: string;
  public num_sequencia: number;
  public modulo: Modulo;
  public questao: QuestaoAula[];
  public liberado: boolean;
 }
