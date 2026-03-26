import { Trilha } from './../../model/Trilha';
import { TrilhaService } from './../../service/trilha.service';


import { AuthService } from './../../service/auth.service';
import { AlertModelService } from './../../shared/alert-model.service';
import { ModuloService } from './../../modulos/modulo.service';
import { Router } from '@angular/router';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment.prod';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-trilhas',
  templateUrl: './trilhas.component.html',
  styleUrls: ['./trilhas.component.css']
})
export class TrilhasComponent implements OnInit {
  faForward = faForward;
  faBackward = faBackward;
  listaResultModulo = []
  listaTrilha: Trilha[]
  name = 'Angular';
  @ViewChild('myModal', {static : true}) myModal:ElementRef;
  constructor(
    private router: Router,
    private moduloService: ModuloService,
    private alertService: AlertModelService,
    private trilhaService: TrilhaService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);

    environment.titulo = 'Trilha Zero'
    environment.icon = 'code'
    environment.temaModulo = ""
    environment.corModulo = ""
    environment.idModulo = 0
    this.findAllTrilha()
    setTimeout(() =>{
      this.myModal.nativeElement.click();;
    }, 100)
  }

  findAllTrilha(){
    this.trilhaService.getAll().subscribe((resp: any) => {
    this.listaTrilha = resp;
     
    })
  }

 

  aulas(tema: string, cor: string, id: number) {
    this.moduloService.showVideoAulas("trilha-zero", "verde",);
    environment.temaModulo = tema
    environment.corModulo = cor
    environment.idModulo = id
  
  }

}
