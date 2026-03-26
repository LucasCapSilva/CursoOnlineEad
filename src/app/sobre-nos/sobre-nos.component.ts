import { AlertModelService } from './../shared/alert-model.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';
@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.css']
})
export class SobreNosComponent implements OnInit {

  constructor(
    private router: Router,
    private alertService: AlertModelService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }
  }

}
