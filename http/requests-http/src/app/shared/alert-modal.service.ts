import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent)
    bsModalRef.content.type = type
    bsModalRef.content.message = message

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout)
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000)
  }
  showAlertWarning(message: string) {
    this.showAlert(message, AlertTypes.WARNING, 3000)
  }

  showAlertInfo(message: string) {
    this.showAlert(message, AlertTypes.INFO, 3000)
  }
}