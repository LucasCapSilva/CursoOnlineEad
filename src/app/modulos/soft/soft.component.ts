import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
@Component({
  selector: 'app-soft',
  templateUrl: './soft.component.html',
  styleUrls: ['./soft.component.css']
})
export class SoftComponent implements OnInit {

  tema: string;
  slide: string;

  constructor(
    private router: Router
    ) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.tema = environment.temaModulo;

  }

  voltar() {
    this.router.navigate(['/modulo-soft']);
    environment.temaModulo = ''
  }
}
