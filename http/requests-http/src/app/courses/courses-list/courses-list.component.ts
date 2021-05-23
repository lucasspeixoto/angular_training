import { Component, OnInit } from '@angular/core';
import { Course } from './courses';

import { CoursesService } from './../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  courses: Course[]

  constructor(
    private service: CoursesService
  ) { }

  ngOnInit(): void {
    this.service.list().subscribe(
      data => this.courses = data
    )

  }

}
