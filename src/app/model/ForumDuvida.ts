import { User } from './User';
import { ForumComentario } from './ForumComentario';
export class ForumDuvida {
  public id: number;
  public titulo: string;
  public question: string;
  public user: User;
  public comment: ForumComentario[];
  public data: Date;
 }
