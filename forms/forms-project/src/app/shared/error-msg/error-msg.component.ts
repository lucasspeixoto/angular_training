import { FormValidations } from './../form-validations';
import { FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  //@Input() mostrarErro: any
  //@Input() msgErro: string

  @Input() control: FormControl
  @Input() label: string

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {

    for (let propertyName in this.control?.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
