import { ConfirmModelComponent } from './confirm-model/confirm-model.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModelService {


  constructor(private bsModalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }


  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS);
  }

  showAlertInfo(message: string) {
    this.showAlert(message, AlertTypes.INFO);
  }

  showConfirm(title: string, msg: string, simTxt?: string, naoTxt?: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(ConfirmModelComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (simTxt) {
      bsModalRef.content.simTxt = simTxt;
    }

    if (naoTxt) {
      bsModalRef.content.naoTxt = naoTxt;
    }

    return (<ConfirmModelComponent>bsModalRef.content).confirmResult;

  }
}
