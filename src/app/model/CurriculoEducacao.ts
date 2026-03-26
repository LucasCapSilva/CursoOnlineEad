import { Curriculo } from "./Curriculo";


export class CurriculoEducacao{
//public id: number;
public nomeEscola: string;
public curso: string;
public mesAnoIn: string;
public mesAnoFim: string;
public curriculo: Curriculo;
public estadoCurso: string;
public extraCurricular: boolean;

constructor(nomeEscola, curso, mesAnoIn, mesAnoFim, curriculo,estadoCurso, extraCurricular) {
    this.nomeEscola = nomeEscola;
    this.curso = curso;
    this.mesAnoIn = mesAnoIn;
    this.mesAnoFim = mesAnoFim;
    this.curriculo = curriculo;
    this.estadoCurso = estadoCurso;
    this.extraCurricular = extraCurricular;
}

}