import { Component, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'crud-operation',
  templateUrl: './crud-operation.component.html',
  styleUrls: ['./crud-operation.component.scss']
})
export class CrudOperationComponent {

  modalRef: BsModalRef;

  constructor(
    private bsmodalservice: BsModalService
  ) { }

  // Create course
  public create(crudForm: any) {
    this.modalRef = this.bsmodalservice.show(crudForm);
  }

}



