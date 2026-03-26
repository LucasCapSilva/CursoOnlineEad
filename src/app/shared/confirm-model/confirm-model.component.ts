import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.css']
})
export class ConfirmModelComponent implements OnInit {


  delOk: boolean;
  idEvento = environment.idEventoCronograma

  @Input() msg: string;
  @Input() title: string;
  @Input() naoTxt: string;
  @Input() simTxt: string;

  confirmResult: Subject<boolean>;


  constructor(
    public modalService: BsModalService,
    public bsModalRef: BsModalRef
    ) {}

  ngOnInit() {

    this.confirmResult = new Subject();

  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  onClose() {
    this.confirmAndClose(false);
  }

  confirmAndClose(value) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }



}
