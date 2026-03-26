import { AlertModelService } from './../../shared/alert-model.service';
import { environment } from 'src/environments/environment.prod';
import { CurriculoProfissionalService } from './../../service/curriculo-profissional.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curriculo } from 'src/app/model/Curriculo';
import { CurriculoProfissional } from 'src/app/model/CurriculoProfissional';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-criar-curriculo-profissional',
  templateUrl: './criar-curriculo-profissional.component.html',
  styleUrls: ['./criar-curriculo-profissional.component.css']
})

export class CriarCurriculoProfissionalComponent implements OnInit {
  id: number;
  idUser:number;
  tipo: string;
  editarCadastrar = ""
  nomeEmpresaSelect = ""
  cargoSelect = ""
  mesAnoIn = ""
  mesAnoFim = ""
  principaisAtividadesSelect = ""
  listCurriculoProfissional = [
  ];

  curriculo = new Curriculo();

  curriculoProfissional: CurriculoProfissional = new CurriculoProfissional("", "", "", "", "", this.curriculo);
  constructor(private router: Router,
    private route: ActivatedRoute,
    private curriculoProfissionalService: CurriculoProfissionalService,
   private curriculoService : CurriculoService,
   private alertService: AlertModelService) { }

   ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tipo = this.route.snapshot.params['tipo'];
    this.idUser = this.route.snapshot.params['idUser'];
    this.curriculo.id = this.id
    if (this.tipo != "editar") {
      this.editarCadastrar = "Avançar"
      environment.titulo = "Criar - Curriculo profissional"
    } else {
      this.editarCadastrar = "Editar"
      environment.titulo = "Editar - Curriculo profissional"
      this.findCurriculoProfissional(this.idUser);
    }


  }
  onInsert() {
    if(this.curriculoProfissional.nomeEmpresa != "" && this.listCurriculoProfissional.length <= 4)
    if (this.curriculoProfissional.nomeEmpresa != "") {
      if (this.curriculoProfissional.cargo != "") {
        if (this.curriculoProfissional.principaisAtividades != "") {
          this.listCurriculoProfissional.push(
            new CurriculoProfissional(this.curriculoProfissional.nomeEmpresa, this.curriculoProfissional.cargo, this.curriculoProfissional.mesAnoIn,
              this.curriculoProfissional.mesAnoFim, this.curriculoProfissional.principaisAtividades, this.curriculo))
          this.curriculoProfissional = new CurriculoProfissional("", "", "", "", "", this.curriculo);
        }
      }
    }
  }
  tipoFormatura(event: any) {
    this.curriculoProfissional.mesAnoIn = event.target.value;
    this.curriculoProfissional.mesAnoFim = event.target.value
  }
  onDelete(n) {
    this.curriculoProfissionalService.deleteCurriculoProfissional(this.listCurriculoProfissional[n].id).subscribe(()=>{
    })
     this.listCurriculoProfissional.splice(n, 1);
     this.alertService.showAlertInfo('curriculo deletado')
    this.findCurriculoProfissional(environment.idUsuario);


}
  findCurriculoProfissional(idUser:number){
    this.curriculoService.getByUserCurriculo(idUser).subscribe((resp: any)=>{
      this.listCurriculoProfissional = resp.profissionais;
        }) 
  }
  saveEndNextStap() {
    if (this.tipo != "editar") {
      this.curriculoProfissionalService.postAllCurriculoProfissional(this.listCurriculoProfissional).subscribe((resp: CurriculoProfissional[]) => {
        this.listCurriculoProfissional = null;
        this.listCurriculoProfissional = resp;
        // this.alertService.showAlertInfo('curriculo criado')
        // this.router.navigate(["visualizar-curriculo/"])
      })
    } else {
      //TODO aqui era pra ser putAll
      this.listCurriculoProfissional.map(profissional =>{
        profissional.curriculo = this.curriculo;
        profissional.curriculo.id = this.id;
      })
      this.curriculoProfissionalService.putAllCurriculoProfissional(this.listCurriculoProfissional).subscribe((resp: CurriculoProfissional[]) => {
        this.listCurriculoProfissional = null;
        this.listCurriculoProfissional = resp;
        this.findCurriculoProfissional(this.idUser);
        this.alertService.showAlertInfo('curriculo editado')
        // this.router.navigate(["curriculo/"])
        this.router.navigate(["criar-curriculo-idioma/", this.id])
      })

    }

  }
}