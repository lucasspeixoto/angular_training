import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from './courses';

import { CoursesService } from './../courses.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, delay, switchMap, take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudOperationComponent } from '../crud-operation/crud-operation.component';
import { CoursesFormComponent } from '../courses-form/courses-form.component';
import { HttpParams } from '@angular/common/http';
import { AddCourseComponent } from '../add-course/add-course.component';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { ThrowStmt } from '@angular/compiler';

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
  deleteModalRef: BsModalRef
  selectedCourse: Course

  @ViewChild('deleteModal') deleteModal: any

  constructor(
    private coursesService: CoursesService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private bsmodalservice: BsModalService
  ) { }


  /* Mesmo após a destruição do componente, pode ser que a inscrição no
   observable continue, consumindo memória, precisamos destruir
   */
  ngOnInit(): void {
    //this.coursesServicee.list().subscribe(data => this.courses = data)
    this.onRefresh();
  }

  onRefresh() {
    this.loadspinner = true
    this.courses$ = this.coursesService.getCoursesList()
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



  // Create course
  onAdd() {
    this.router.navigate(['courses/new'])
  }
  onAdd2(addForm: any) {
    this.modalRef = this.bsmodalservice.show(addForm)
  }

  // Edit course
  onEdit(id: any) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }
  // Edit course
  onEdit2(editForm: any) {
    this.modalRef = this.bsmodalservice.show(editForm)
  }

  // Delete course
  onDelete(course: Course) {
    this.selectedCourse = course //Como o ng-template esta fora do escopo de visualização do nosso html, não conseguimos passar o curso como parâmetro, é necessário a atribuição via componente
    //Sem o showConfirm
    //this.deleteModalRef = this.bsmodalservice.show(this.deleteModal, { class: 'modal-sm' })
    //this.alertModalService.showConfirm('Delete Course', 'Are you sure you want delete this course?', 'Yes', 'No')
    const result$ = this.alertModalService.showConfirm('Delete Course', 'Are you sure you want delete this course?', 'Yes', 'No')
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(
          result => result ? this.coursesService.remove(course.id)
            : EMPTY)
      )
      .subscribe(
        success => this.onRefresh(),
        error => this.alertModalService.showAlertDanger('Erro ao deletar curso, tente novamente mais tarde.')
      )
  }

  OnConfirmDelete() {
    this.coursesService.remove(this.selectedCourse.id)
      .subscribe(
        success => this.onRefresh(),
        error => this.alertModalService.showAlertDanger('Erro ao deletar curso, tente novamente mais tarde.')
      )
    this.deleteModalRef.hide()
  }
  OnDeclineDelete() {
    this.deleteModalRef.hide()
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar, tente novamente mais tarde.')
  }

}
