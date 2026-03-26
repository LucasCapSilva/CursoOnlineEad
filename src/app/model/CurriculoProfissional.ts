import { Curriculo } from "./Curriculo";
export class CurriculoProfissional {
  public id: number;
  public nomeEmpresa: string;
  public cargo: string;
  public mesAnoIn: string;
  public mesAnoFim: string;
  public principaisAtividades: string;
  public curriculo: Curriculo;

  constructor(nomeEmpresa, cargo, mesAnoIn, mesAnoFim, principaisAtividades, curriculo) {
    this.nomeEmpresa = nomeEmpresa;
    this.cargo = cargo;
    this.mesAnoIn = mesAnoIn;
    this.mesAnoFim = mesAnoFim;
    this.principaisAtividades = principaisAtividades;
    this.curriculo = curriculo;
  }
}
