import { Passagem } from './Passagem';
import { UserInfo } from './UserInfo';
import { InstrutorBloco } from './InstrutorBloco';
import { Relato } from './Relato';
import { User } from 'src/app/model/User';
import { Curso } from './Curso';
import { Turma } from 'src/app/model/Tuma';

export class DiarioBordo {

    public id:number
    public turma: Turma
    public curso: Curso
    public dataAula0: Date
    public dataDiaAdm: Date
    public dataFormatura: Date
    public instrutorBloco: InstrutorBloco[]
    public tecnicoBES: User
    public userInfo: UserInfo[]
    public relato : Relato[]
    public passagem: Passagem[]
    public relator: User;
  }
  