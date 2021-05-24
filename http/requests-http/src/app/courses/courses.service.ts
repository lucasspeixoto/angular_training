import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, tap } from 'rxjs/operators'
import { Course } from './courses-list/courses';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = `${environment.API}courses`

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Course[]>(this.API)
    .pipe(
      delay(1000),
      tap(console.log)
    )
  }

}
