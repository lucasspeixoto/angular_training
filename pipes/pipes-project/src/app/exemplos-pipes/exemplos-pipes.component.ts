import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/7KICIUB'
  }

  filtro: string = ''

  livros: string[] = ['Angular 11', 'Python', 'React Native']

  addLivro(addLivro: string) {
    this.livros.push(addLivro)
    console.log(this.livros)
  }

  //Função para filtrar livro
  obterLivro() {
    if (
      this.livros.length === 0 ||
      this.filtro === undefined ||
      this.filtro.trim() === '')
      {
      return this.livros
      }

    const filter = this.filtro.toLocaleString().toLocaleLowerCase();
    return this.livros.filter(
      (v: string) => v.toLocaleLowerCase().includes(filter)
    )
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000)
  })

  valorAsync2 = interval(2000).pipe(map((valor:any) => 'Valor assíncrono 2'));

  constructor() { }

  ngOnInit(): void {
  }

}
