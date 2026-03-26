import { Curriculo } from "./Curriculo";


export class CurriculoComportamentais {
public id: number;
public descricao: string;
public curriculo: Curriculo;

constructor(descricao,curriculo){
this.descricao = descricao;
this.curriculo = curriculo;
}
}