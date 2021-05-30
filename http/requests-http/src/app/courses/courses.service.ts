import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, delay, map, take, tap } from 'rxjs/operators'
import { Course } from './courses-list/courses';
import { environment } from './../../environments/environment';
import { EMPTY, Observable } from 'rxjs';
import { AlertModalService } from '../shared/alert-modal.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = `${environment.API}courses`

  constructor(
    private http: HttpClient,
    private alertModalService: AlertModalService,
    private router: Router
  ) { }

  list() {
    console.log('list')
    return this.http.get<Course[]>(this.API)
      .pipe(
        delay(10),
        tap(console.log)
      )
  }

  loadByID(id: number) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1)) // .pipe(take(1)) vai no servidor uma única vez e volta
  }

  /* Erro no servi;o 
  create(course: string): Observable<Course> {
    return this.http.post<Course>(this.API, course).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
      )
  } */
  create(course: string): Observable<Course> {
    return this.http.post<Course>(this.API, course)
      .pipe(
        take(1),
        catchError(e => this.errorHandler(e))
      )
  }

  errorHandler(e: any): Observable<any> {
    this.alertModalService.showAlertInfo('Erro ao adicionar curso. Tente novamente mais tarde.')
    return EMPTY
  }

}
