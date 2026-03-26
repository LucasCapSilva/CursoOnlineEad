import { PercentEntregasObr } from './../model/PercentEntregasObr';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { RespBarometroDia } from './../model/RespBarometroDia';
import { BarometroDiarioService } from './../service/barometro-diario.service';
import { AuthService } from './../service/auth.service';
import { PercentEntregas } from './../model/PercentEntregas';
import { RelatoriosService } from './../service/relatorios.service';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-participante',
  templateUrl: './area-participante.component.html',
  styleUrls: ['./area-participante.component.css']
})
export class AreaParticipanteComponent implements OnInit {

  entregasTotal: PercentEntregas = new PercentEntregas()
  entregasTotalObr: PercentEntregasObr = new PercentEntregasObr ()
  entregasPendentes: number
  entregasPendentesOb: number
  entregasPendentesFinal: number

  respBarometroDia: RespBarometroDia = new RespBarometroDia()
  barometroPendente: number


  constructor(
    public relatorioService: RelatoriosService,
    public auth: AuthService,
    private barometroService: BarometroDiarioService,
    private alertas: AlertModelService,
    private router: Router
  ) { }

  ngOnInit() {
    environment.titulo = 'Inicio'
    environment.icon = 'home'

    

    if(environment.idTurma == 8){
      this.alertas.showAlertInfo('Seu acesso não está mais disponível.')
      environment.token = ''
      this.router.navigate(['/login'])
    }

    this.respostasBarometro()
    this.findEntregasTotal()
  }
  titulo(nome: string, icon: string){
    environment.titulo = nome
    environment.icon = icon
  }

  findEntregasTotal(){
    this.relatorioService.getByEntregasTotal(environment.idUsuario, environment.idTurma).subscribe((resp: PercentEntregas) => {
      this.entregasTotal = resp
      environment.entregaPendente = this.entregasTotal.qtdAtividades - this.entregasTotal.qtdEntregas
    })

    this.relatorioService.getByEntregasTotalObr(environment.idUsuario, environment.idTurma).subscribe((resp: PercentEntregasObr) => {
      this.entregasTotalObr = resp
      environment.entregaPendenteOb = this.entregasTotalObr.qtdAtividades - this.entregasTotalObr.qtdEntregas
    })

  }



  respostasBarometro(){
    this.barometroService.respostasBarometro(environment.idUsuario).subscribe((resp: RespBarometroDia) => {
      this.respBarometroDia = resp
      if(this.respBarometroDia.qtd == 2){
        this.barometroPendente = 0
      } else if (this.respBarometroDia.qtd == 1){
        this.barometroPendente = 1
      } else {
        this.barometroPendente = 2
      }
    })

    
  }

  
}
