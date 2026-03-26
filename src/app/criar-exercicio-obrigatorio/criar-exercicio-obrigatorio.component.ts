import { environment } from 'src/environments/environment.prod';
import { take, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Modulo } from './../model/Modulo';
import { ModuloService } from './../modulos/modulo.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Turma } from './../model/Tuma';
import { TurmaService } from './../service/turma.service';
import { Router } from '@angular/router';
import { AtividadesObrigatoriasService } from './../service/atividades-obrigatorias.service';
import { AtividadeObrigatoria } from './../model/AtividadeObrigatoria';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-exercicio-obrigatorio',
  templateUrl: './criar-exercicio-obrigatorio.component.html',
  styleUrls: ['./criar-exercicio-obrigatorio.component.css']
})
export class CriarExercicioObrigatorioComponent implements OnInit {

  atividade: AtividadeObrigatoria = new AtividadeObrigatoria()
  listaAtividades: AtividadeObrigatoria[]

  modulo: Modulo = new Modulo()
  listaModulos: Modulo[]
  idModulo: number
  idModuloSelect: number

  key = 'date'
  reverse = true
  delOk: boolean

  constructor(
    private atividadeObrigatoriaService: AtividadesObrigatoriasService,
    private router: Router,
    private alerta: AlertModelService
  ) { }

  ngOnInit() {
    this.findAllModulos()
  }

 findAllModulos(){
   this.atividadeObrigatoriaService.getAllModulos().subscribe((resp: Modulo[]) => {
     this.listaModulos = resp
   })
 }

 findByIdModulo(){
   this.atividadeObrigatoriaService.getByIdModulo(this.idModulo).subscribe((resp: Modulo)=>{
     this.modulo = resp
   })
 }

  publicar(){

    this.modulo.id = this.idModulo
    this.atividade.modulo = this.modulo
    this.atividade.modulo.curso = null
    this.atividadeObrigatoriaService.postAtividade(this.atividade).subscribe((resp: AtividadeObrigatoria) => {
      this.atividade = resp
      this.alerta.showAlertSuccess('Atividade publicada com sucesso!')
      this.router.navigate(['/home'])

    setTimeout(()=>{
      this.router.navigate(['/admin'])
    }, 500)
    })
  }

  findAtividadesByModulos(){
    this.atividadeObrigatoriaService.getAllAtividadesByModulo(this.idModuloSelect).subscribe((resp: AtividadeObrigatoria[]) => {
      this.listaAtividades = resp
    })
  }

  titulos(nome: string, icone: string){
    environment.titulo = nome
    environment.icon = icone
  }

  /* onDeleteAtividade(item) {
    const result$ = this.alerta.showConfirm('Confirmação', 'Deseja realmente apagar esse exercício?', 'Sim', 'Não');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.atividadeObrigatoriaService.deleteAtividade(item.id) : EMPTY)
      ).subscribe(() => {
        this.delOk = true;
        this.alerta.showAlertSuccess('Exercício apagado com sucesso!');
        this.findAtividadesByModulos();
      }, err => {
        console.log(this.atividade);
      });
  } */

}
