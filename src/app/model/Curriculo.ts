import { CurriculoComportamentais } from "./CurriculoComportamentais";
import { CurriculoEducacao } from "./CurriculoEducacao";
import { CurriculoIdioma } from "./CurriculoIdioma";
import { CurriculoPortifolio } from "./CurriculoPortifolio";
import { CurriculoProfissional } from "./CurriculoProfissional";
import { CurriculoTecnico } from "./CurriculoTecnico";
import { Curso } from "./Curso";
import { User } from "./User";


export class Curriculo {

    public id: number;
    public user: User;
    public foto: string;
    public nome: string;
    public sobrenome: string;
    public curso: Curso;
    public celular: string;
    public email: string;
    public linkGitHub: string;
    public linkLinKedIn: string;
    public cidade: string;
    public estado: string;
    public sobreMim: string;
    public linkVideo :string;
    public emprego: boolean;
    public raca: String;
    public genero: String;
    public typePcd: String;
    public pcd: boolean;
    public temExtra: boolean=false;
    public temEduca: boolean=false;
    public curriculoComportamentais: CurriculoComportamentais[];
    public curriculoTecnico: CurriculoTecnico[];
    public curriculoPortifolio: CurriculoPortifolio[];
    public curriculoEducacao: CurriculoEducacao[];
    public curriculoProfissional: CurriculoProfissional[];
    public curriculoIdioma: CurriculoIdioma[];
}
