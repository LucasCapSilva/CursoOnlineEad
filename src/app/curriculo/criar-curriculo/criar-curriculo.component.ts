import { AlertModelService } from './../../shared/alert-model.service';
import { AuthService } from './../../service/auth.service';
import { Curso } from './../../model/Curso';
import { CurriculoService } from './../../service/curriculo.service';
import { UserService } from './../../service/user.service';
import { estados } from './../../model/estados';
import { Curriculo } from 'src/app/model/Curriculo';
import { User } from './../../model/User';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-curriculo',
  templateUrl: './criar-curriculo.component.html',
  styleUrls: ['./criar-curriculo.component.css']
})
export class CriarCurriculoComponent implements OnInit {

  userId: number = environment.idUsuario;
  curso: Curso = new Curso();
  curriculoId: number = 0;
  usuario: User = new User();
  curriculo: Curriculo = new Curriculo();
  curriculoPut: Curriculo = new Curriculo;
  fileData: any;
  imagem: any = 'https://i.imgur.com/iPnUWdQ.png';
  Cidade: any = {};
  estados: any[] = estados;
  Municipios: any[];
  cidadeSel: string;
  estadoSel: string;
  id: number;
  tipo: string;
  editarCadastrar = "";
  pcdSelect = "";
  typePcd="";
  genero="";
  raca="";


  constructor(private userService: UserService,
    private service: CurriculoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModelService,
    private alertService2: AlertService) { }

  ngOnInit(): void {
    this.findUserById();
    this.id = this.route.snapshot.params['id'];
    this.tipo = this.route.snapshot.params['tipo'];
    this.curriculo.id = this.id
    if (this.tipo == "editar") {
      this.editarCadastrar = "Editar"
      environment.titulo = "Editar - Curriculo"
      this.findCurriculo(this.id);
    }else{
      this.editarCadastrar = "Avançar"
      environment.titulo = "Criar - Curriculo"
    }
   

   
  }

  findUserById() {
    this.userService.getUserById(this.userId).subscribe((resp: User) => {
      this.usuario = resp;
    })
  }

  findCurriculo(idUser:number){
    this.service.getByUserCurriculo(idUser).subscribe((resp: any)=>{
      this.curriculo = resp;
      let reader = new FileReader();
      this.imagem = this.curriculo.foto
        }) 
  }

  tipoPcd(event: any) {
    this.curriculo.pcd = event.target.value
    this.pcdSelect = event.target.value
  }

  selectPcd(event: any){
    this.curriculo.typePcd = event.target.value
    this.typePcd = event.target.value
  }

  selectGenero(event: any){
    this.curriculo.genero = event.target.value
    this.genero = event.target.value
  }
  selectRaca(event: any){
    this.curriculo.raca = event.target.value
    this.raca = event.target.value
  }

  postCurriculo(curriculo: Curriculo) {
    curriculo.user = new User
    curriculo.user.id = environment.idUsuario;
    this.curso.id = environment.idCurso; 
    curriculo.curso = this.curso;
    this.service.postCurriculo(curriculo).subscribe((resp: Curriculo) => {
      this.curriculo = resp
      this.curriculoId = this.curriculo.id;
      this.alertService.showAlertInfo('curriculo criado')
      this.router.navigate(["criar-curriculo-educacao/", this.curriculoId])

    })
  }

  putCurriculo(curriculo: Curriculo) {
    this.curriculoPut.id = curriculo.id;
    this.curriculoPut.foto = curriculo.foto;
    this.curriculoPut.nome = curriculo.nome;
    this.curriculoPut.user = new User
    this.curriculoPut.user.id = this.id
    this.curriculoPut.sobrenome = curriculo.sobrenome;
    this.curriculoPut.celular = curriculo.celular;
    this.curriculoPut.estado = curriculo.estado;
    this.curriculoPut.cidade = curriculo.cidade;
    this.curriculoPut.linkLinKedIn = curriculo.linkLinKedIn
    this.curriculoPut.email = curriculo.email;
    this.curriculoPut.linkGitHub = curriculo.linkGitHub;
    this.curriculoPut.sobreMim = curriculo.sobreMim;
    this.curriculoPut.linkVideo = curriculo.linkVideo;
    this.curriculoPut.genero = curriculo.genero;
    this.curriculoPut.pcd = curriculo.pcd;
    this.curriculoPut.raca = curriculo.raca;
    this.curriculoPut.typePcd = curriculo.typePcd;
    
    this.service.putCurriculo(this.curriculoPut).subscribe((resp: Curriculo) => {
      this.curriculo = resp
      this.curriculoId = resp.id;
      this.alertService.showAlertInfo('curriculo editado')
      this.router.navigate(["criar-curriculo-educacao/","editar", this.curriculoId,this.curriculo.user.id])

    })
  }

  saveEndNextStap() {
    let curso: Curso = new Curso();
    curso.id = 1;

    this.curriculo.foto = this.imagem;
    this.curriculo.user = this.usuario;
    this.curriculo.curso = curso; // TODO Tornar dinamico

    this.curriculo.estado = this.Cidade.nome;
    if (this.curriculo.estado == undefined || this.curriculo.cidade == undefined) {
      this.alertService.showAlertDanger("estado ou cidade  precisa ser prenchido")
    }
    if (this.tipo == "editar") {
      this.putCurriculo(this.curriculo);
    }else{
      this.postCurriculo(this.curriculo);
    } 

  }

  changeEstado() {
    const cSelecionada = this.estados.find(m => m.nome == this.Cidade.nome);
    this.Municipios = cSelecionada ? cSelecionada.cidades : [];
  }

  changeCarregarFoto(event: any) {
    this.fileData = event.target.files[0];
    if (
      this.fileData.type == 'image/png' ||
      this.fileData.type == 'application/pdf' ||
      this.fileData.type == 'image/jpg' ||
      this.fileData.type == 'image/jpeg'
    ) {
      this.getBase64(event);

     
    } else {
      // TODO Chamar o service de alert
      alert('file type should be image of pdf');
      return;
    }

  }

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    if (file.size <= 81308) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagem = reader.result.toString();
      };
      reader.onerror = function (error) {
      };
    }else{
      this.alertService.showAlertDanger("Imagem muito grande insira uma imagem menor que 836 x 470 pixel")
    }
   
  }
  public showAlert(){
    Swal.fire({
      color:'#f0f8ff',
      confirmButtonColor:'#007bd9',
      background:'#db2828',
      position: 'bottom-end',
      title: 'EVITE SELFIES OU FOTOS EM CONTEXTOS INFORMAIS.',
      text: 'Utilize uma foto adequada ao contexto profissional, com fundo branco ou neutro',
      imageUrl: 'https://i.imgur.com/m8YRKCG.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
}
}
 
