import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();

  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

  results$: Observable<any>;

  total: number;

  readonly FIELDS: string = 'name,description,version,homepage'

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    //valueChanges retorna um observable
    this.results$ = this.queryField.valueChanges  
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(200), //200 ms de espera antes de disparar a próxima requisição (para não disparar ao digitar todas as letras)
        distinctUntilChanged(), //Se repetir o valor não manda a requisição, só quando alterar
        tap(value => console.log(value)),
        switchMap(value => this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })), //Transforma o valor que recebemos em outro observable (Sempre cancela requisições anteriores)
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
        )     
  }

  onSearch() {

    const fields = 'name,description,version,homepage'

    let inputSearch = this.queryField.value
    if (inputSearch && (inputSearch = inputSearch.trim()) !== '') {

      const params_ = {
        search: inputSearch,
        fields: fields
      }

      //Outra forma de criar um objeto de parâmetros
      let params = new HttpParams()
      params = params.set('search', inputSearch)
      params = params.set('fields', fields) 

      this.results$ = this.http.get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        )
    }

  }

}
