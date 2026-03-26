import { Curriculo } from "./Curriculo";


export class CurriculoPortifolio{
    public id: number;
    public nomeProjeto: string;
    public link: string;
    public descricao: string;
    public numeroPi: string
    public curriculo: Curriculo;

    constructor(nomeProjeto,link,descricao,numeroPi,curriculo){
        this.nomeProjeto = nomeProjeto;
        this.link = link;
        this.descricao = descricao;
        this.numeroPi = numeroPi;
        this.curriculo = curriculo;
    }
}