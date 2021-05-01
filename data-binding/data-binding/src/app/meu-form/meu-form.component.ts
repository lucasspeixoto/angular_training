import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent implements OnInit {

  pessoa: any = {
    nome: 'Liana',
    idade: 27,

  }

  constructor() { }

  ngOnInit(): void {
  }

}
