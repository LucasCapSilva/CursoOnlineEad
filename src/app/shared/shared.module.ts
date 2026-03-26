import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModelComponent } from './confirm-model/confirm-model.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
@NgModule({

  declarations: [AlertModalComponent, ConfirmModelComponent],

  exports: [AlertModalComponent, ConfirmModelComponent],

  imports: [CommonModule, FormsModule, AppRoutingModule],

  entryComponents: [AlertModalComponent, ConfirmModelComponent]
})
export class SharedModule { }
