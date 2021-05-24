import { Component, OnInit } from '@angular/core';
import { Course } from './courses';

import { CoursesService } from './../courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  //courses: Course[]

  courses$: Observable<Course[]>     // $ significar que a variável é um observable

  constructor(
    private service: CoursesService
  ) { }

  /* Mesmo após a destruição do componente, pode ser que a inscrição no
   observable continue, consumindo memória, precisamos destruir
   */
  ngOnInit(): void {
    //this.service.list().subscribe(data => this.courses = data)
    this.courses$ = this.service.list()
  }

}
