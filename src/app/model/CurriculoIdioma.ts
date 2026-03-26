import { Curriculo } from "./Curriculo";


export class CurriculoIdioma {
    // id: number;
    idioma: string;
    nivel: string;
    curriculo: Curriculo
    constructor( idioma, nivel, curriculo) {
        // this.id = id;
        this.idioma = idioma;
        this.nivel = nivel;
        this.curriculo = curriculo;
    }
}