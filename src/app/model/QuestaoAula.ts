import { UploadVideo } from './UploadVideo';
import { Resposta } from './RespostaAula';

export class QuestaoAula {
  public id: number
  public quastao: string
  public responstas: Resposta[]
  public aula: UploadVideo
}
