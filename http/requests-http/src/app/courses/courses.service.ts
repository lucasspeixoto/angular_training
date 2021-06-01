import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, take } from 'rxjs/operators'
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

  //Obter listagem de cursos
  getCoursesList() {
    return this.http.get<Course[]>(this.API)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      )
  }

  //Obter id de curso selecionado
  loadByID(id: number) {
    return this.http.get<Course[]>(`${this.API}/${id}`).pipe(take(1)) // .pipe(take(1)) vai no servidor uma única vez e volta
  }

  //Criar curso enviando ao servidor
  create(course: string): Observable<Course> {
    return this.http.post<Course>(this.API, course).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  //Atualizar curso enviando ao servidor
  update(course: any) {
    return this.http.put(`${this.API}/${course.id}`, course).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  //Metodo para salvar curso (adição e edição)
  save(course: any) {
    if (course.id) {
      return this.update(course)
    } 
    return this.create(course)
  }

  errorHandler(e: any): Observable<any> {
    this.alertModalService.showAlertInfo('Erro ao adicionar curso. Tente novamente mais tarde.')
    return EMPTY
  }

}
