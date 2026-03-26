import { environment } from './../../environments/environment.prod';
import { FormBemEstarSolicita } from './../model/FormBemEstarSolicita';
import { DemandasBemEstar } from './../model/DemandasBemEstar';
import { BemestarService } from './../service/bemestar.service';
import { Router } from '@angular/router';
import { FormBemEstarPos } from './../model/FormBemEstarPos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-form-bemestar-pos',
  templateUrl: './lista-form-bemestar-pos.component.html',
  styleUrls: ['./lista-form-bemestar-pos.component.css']
})
export class ListaFormBemestarPosComponent implements OnInit {

  listaFormsSolicita: FormBemEstarSolicita[]
  pendentes: number = 0

  form: FormBemEstarPos = new FormBemEstarPos()
  listaForms: FormBemEstarPos[]
  listaDemandas: any[]

  key = "data"
  reverse = false

  constructor(
    private router: Router,
    private bemestarService: BemestarService
  ) { }

  ngOnInit() {

    this.findAllFormsPos()
    this.findAllFormsSolicita()
  }

  titulo(nome: string, icon: string){
    environment.titulo = nome
    environment.icon = icon
  }

  findAllFormsPos(){
    this.bemestarService.getAllFormsPos().subscribe((resp: FormBemEstarPos[])=>{
      this.listaForms = resp
      let loading = document.querySelector('#loading')
      loading.setAttribute('style', 'display: none !important;')
    })
  }

  findAllFormsSolicita(){
    this.bemestarService.getAllFormsSolicita().subscribe((resp: FormBemEstarSolicita[])=>{
      resp.forEach((i)=>{
        if(i.atendido == null){
          this.pendentes = this.pendentes + 1
        }
      })

    })
  }

}
