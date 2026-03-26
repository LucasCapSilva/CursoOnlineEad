import { AlertModelService } from './../shared/alert-model.service';
import { environment } from './../../environments/environment.prod';
import { User } from './../model/User';
import { BemestarService } from './../service/bemestar.service';
import { Router } from '@angular/router';
import { FormBemEstarSolicita } from './../model/FormBemEstarSolicita';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-form-bemestar-solicita',
  templateUrl: './lista-form-bemestar-solicita.component.html',
  styleUrls: ['./lista-form-bemestar-solicita.component.css']
})
export class ListaFormBemestarSolicitaComponent implements OnInit {

  formSolicita: FormBemEstarSolicita = new FormBemEstarSolicita()
  listaFormsSolicita: FormBemEstarSolicita[]

  user: User = new User()

  key = "atendido"
  reverse = false

  constructor(
    private router: Router,
    private bemestarService: BemestarService,
    private alerta: AlertModelService
  ) { }

  ngOnInit() {

    this.findAllFormsSolicita()
  }

  findAllFormsSolicita(){
    this.bemestarService.getAllFormsSolicita().subscribe((resp: FormBemEstarSolicita[])=>{
      this.listaFormsSolicita = resp
      let loading = document.querySelector('#loading2')
      loading.setAttribute('style', 'display: none !important;')
    })
  }

  getFormById(id: number){
    this.bemestarService.getByIdFormSolicita(id).subscribe((resp: FormBemEstarSolicita)=>{
      this.formSolicita = resp

      this.user.id = environment.idUsuario
      this.formSolicita.atendido = this.user
      this.formSolicita.turma.curso = null
      this.bemestarService.putFormSolicita(this.formSolicita).subscribe((resp: FormBemEstarSolicita) => {
      this.formSolicita = resp
    })


    this.alerta.showAlertSuccess('Atendimento registrado!')
    this.router.navigate(['/home'])
    setTimeout(()=>{
      this.router.navigate(['/lista-form-bemestar-pos'])
    }, 500)

    })
  }


}
