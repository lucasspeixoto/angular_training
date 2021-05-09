import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-viewchild',
  templateUrl: './viewchild.component.html',
  styleUrls: ['./viewchild.component.css']
})
export class ViewchildComponent implements OnInit {

    // To get component name from app component
    @Input() componentName!: string;
    constructor() {}

    ngOnInit(): void {

    }
}
