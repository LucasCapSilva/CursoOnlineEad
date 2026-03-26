import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { OrderModule } from 'ngx-order-pipe';
import { ConteudoUmComponent } from './conteudo-um/conteudo-um.component';
import { VideosComponent } from './videos/videos.component';
import { BarometroComponent } from './barometro/barometro.component';
import { SoftComponent } from './soft/soft.component';


@NgModule({
  declarations: [
    ConteudoUmComponent,
    VideosComponent,
    BarometroComponent,
    SoftComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    OrderModule
  ],
  entryComponents: [
    ConteudoUmComponent,
    VideosComponent,
    BarometroComponent

  ],
  exports: [
    ConteudoUmComponent,
    VideosComponent,
    BarometroComponent
  ],

})
export class ModulosModule { }
