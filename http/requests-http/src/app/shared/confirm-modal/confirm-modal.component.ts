import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  // Parâmetros do modal que serão passados dinamicamente
  @Input('title') title: string
  @Input('msg') msg: string 
  @Input('cancelTxt') cancelTxt = 'Cancel'
  @Input('okTxt') okTxt = 'Confirm'

  confirmResult: Subject<boolean>

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.confirmResult = new Subject()
  }

  onConfirm() {
    this.ConfirmAndClose(true)
  }

  onClose() {
    this.ConfirmAndClose(false)
  }

  private ConfirmAndClose(value: boolean) {
    this.confirmResult.next(value)
    this.bsModalRef.hide()
  }

  

}
