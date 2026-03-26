import { AlertModelService } from './../../shared/alert-model.service';
import { Component, OnInit } from '@angular/core';
import { Turma } from 'src/app/model/Tuma';
import { CurriculoService } from 'src/app/service/curriculo.service';
import { RelatoriosService } from 'src/app/service/relatorios.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-botao-bem-emp',
  templateUrl: './botao-bem-emp.component.html',
  styleUrls: ['./botao-bem-emp.component.css']
})
export class BotaoBemEmpComponent implements OnInit {
 
  
  idUser: number;
  nome: string
  menssagem: string
  turma: Turma = new Turma()
  mensagem:string;
  constructor(
    private relatorioService: RelatoriosService,
    private curriculoService: CurriculoService,
    private alertService: AlertModelService
  ) { }

  ngOnInit(): void {
    this.nome = environment.nome
    this.idUser= environment.idUsuario
    this.mensagem =`https://api.whatsapp.com/send?phone=5511933390527&text=Ola tudo bem equipe do bem estar? Aqui é (o/a/e) ${environment.nome} da turma ${environment.turma}, preciso da ajuda do bem estar.`
  }

  findByIdTurma() {
    this.relatorioService.getByIdTurma(environment.idTurma).subscribe((resp: Turma) => {
      this.turma = resp
    })
  }

  menssagemm(event: any) {
    this.menssagem = event.target.value
    
  }

  enviarDuvida(){
    
    if(this.menssagem == ''){
      this.alertService.showAlertInfo('preencha o campo')
    }else{
    this.curriculoService.getByDuvidaEmpregabilidade(this.idUser,this.menssagem).subscribe((resp: any) => {
      this.alertService.showAlertInfo('ogrigado pelo seu contato')
    })
  }
  }
}