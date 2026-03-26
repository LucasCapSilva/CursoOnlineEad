import { QuestaoAula } from './QuestaoAula';

export class Resposta{
  public id: number
  public resp: string
  public correta: boolean
  public questao: QuestaoAula
}
