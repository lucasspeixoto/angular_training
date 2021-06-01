import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from './courses';

import { CoursesService } from './../courses.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudOperationComponent } from '../crud-operation/crud-operation.component';
import { CoursesFormComponent } from '../courses-form/courses-form.component';
import { HttpParams } from '@angular/common/http';
import { AddCourseComponent } from '../add-course/add-course.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  //courses: Course[]

  loadspinner: boolean = true
  courses$: Observable<Course[]> // $ significar que a variável é um observable
  error$ = new Subject<boolean>()
  modalRef: BsModalRef;
  openEditor: boolean = false

  constructor(
    private service: CoursesService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private bsmodalservice: BsModalService
  ) { }


  /* Mesmo após a destruição do componente, pode ser que a inscrição no
   observable continue, consumindo memória, precisamos destruir
   */
  ngOnInit(): void {
    //this.service.list().subscribe(data => this.courses = data)
    this.onRefresh();
  }

  onRefresh() {
    this.loadspinner = true
    this.courses$ = this.service.getCoursesList()
      .pipe(
        //delay(2000),
        catchError((error) => {
          console.error(error);
          //this.error$.next(true);
          this.loadspinner = false
          this.handleError()
          return EMPTY;
        })
      );
  }

  onAdd2(crudForm: any) {
    this.modalRef = this.bsmodalservice.show(crudForm)
  }

  // Create course
  onAdd() {
    this.router.navigate(['courses/new'])
    /* this.modalRef.content.event.subscribe(
      (result: any) => {
        console.log(result)
        if (result == 'OK') {
          this.onRefresh()
        }
      }
    ) */
  }

  // Edit course
  onEdit(id: any) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }


  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar, tente novamente mais tarde.')
  }

}
