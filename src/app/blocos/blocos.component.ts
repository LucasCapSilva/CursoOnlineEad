import { environment } from './../../environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.component.html',
  styleUrls: ['./blocos.component.css']
})
export class BlocosComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    environment.titulo = 'Blocos'
    environment.icon = 'th-large'
  }

  nomeBloco(nome: string, icon: string){
    environment.titulo = nome
    environment.icon = icon
  }

}
