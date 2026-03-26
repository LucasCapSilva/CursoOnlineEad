import { AuthService } from './../service/auth.service';
import { RegistroSaidaService } from './../service/registro-saida.service';
import { ModuloService } from './../modulos/modulo.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { AlertModelService } from '../shared/alert-model.service';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-modulo-dois',
  templateUrl: './modulo-dois.component.html',
  styleUrls: ['./modulo-dois.component.css']
})
export class ModuloDoisComponent implements OnInit {
  faForward = faForward;
  faBackward = faBackward;
  listaResultModulo = []
  constructor(
    private router: Router,
    private moduloService: ModuloService,
    private alertService: AlertModelService,
    private saidaService: RegistroSaidaService,
    public auth: AuthService
    ) { }

  ngOnInit() {
    window.scroll(0, 0);
    environment.titulo = 'Bloco II'
    environment.icon = 'database'
    this.saidaService.mouseInativo();
    const token = environment.token;
  
    this.findModuloByIdByCursoByBloco(environment.idCurso,2)
    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
  }

  findModuloByIdByCursoByBloco(cursoId:number,idBloco:number){
    this.moduloService.getModuloByIdByCursoByBloco(cursoId,idBloco).subscribe((resp: any) => {
      resp.map(item=>{
        this.listaResultModulo.push({"id":item.id,"descricao":item.descricao,"subdescricao":item.subdescricao,"linkImagem":item.linkIcone})
      })

    })
  }

  changeCurso(cursoId:number,idBloco:number){
    this.listaResultModulo = []
    environment.idCurso = cursoId
    this.findModuloByIdByCursoByBloco(environment.idCurso,2)
  }


  aulas(tema: string, cor: string, id: number) {
    this.moduloService.showVideoAulas(tema, cor);
    environment.temaModulo = tema
    environment.corModulo = cor
    environment.idModulo = id
  }

}
