import { ForumDuvida } from './ForumDuvida';
import { User } from './User';
export class ForumComentario {
  public id: number;
  public user: User;
  public question: ForumDuvida;
  public comment: string;
  public data: Date;
}
