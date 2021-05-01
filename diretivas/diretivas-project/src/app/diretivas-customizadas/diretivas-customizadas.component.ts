import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-customizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrls: ['./diretivas-customizadas.component.css']
})
export class DiretivasCustomizadasComponent implements OnInit {

  mostraCursos: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onMostrarCursos() {
    this.mostraCursos = !this.mostraCursos
  }

}
