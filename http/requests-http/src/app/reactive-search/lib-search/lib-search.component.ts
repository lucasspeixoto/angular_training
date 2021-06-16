import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

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
