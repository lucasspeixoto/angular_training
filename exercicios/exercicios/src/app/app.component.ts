import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewchildComponent } from './viewchild/viewchild.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exercicios';

  /* // Getting the reference
  @ViewChild(ViewchildComponent, { static: false }) hello!: ViewchildComponent

  // Getting the reference of the button control
  @ViewChild("myButton", { static: false }) myButton!: ElementRef;

  ngAfterViewInit() {
    console.log("Hello ", this.hello.componentName)
    console.log("Hello ", this.myButton.nativeElement);
  } */

}
