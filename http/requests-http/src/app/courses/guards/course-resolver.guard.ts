
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Course } from '../courses-list/courses';
import { CoursesService } from '../courses.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolverGuard implements Resolve<Course> {

  constructor(
    private coursesService: CoursesService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    if (route.params && route.params.id) {
      return this.coursesService.loadByID(route.params.id)
    }

    return of({
      id: null,
      name: null
    })
  }
}


