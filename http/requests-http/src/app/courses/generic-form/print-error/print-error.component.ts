import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.scss']
})
export class PrintErrorComponent implements OnInit {

  @Input("control") form: any;

  ngOnInit() {
    
  }

  hasError(field: string) {
    return this.form.get(field)?.errors
  }

}
