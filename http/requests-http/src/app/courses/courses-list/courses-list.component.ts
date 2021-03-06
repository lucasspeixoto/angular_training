import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from './courses';

import { CoursesService } from './../courses.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take, throttleTime } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericFormComponent } from '../generic-form/generic-form.component';



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

  //Parâmetros do form
  title: string
  successMsg: string
  errorMsg: string

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
  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.loadspinner = true
    this.courses$ = this.coursesService.getCoursesList()
      .pipe(
        catchError(() => {
          this.loadspinner = false
          this.handleError()
          return EMPTY;
        })
      );
  }

  // Create course
  onAdd(form: any) {
    this.title = 'Add Course'
    this.successMsg = 'Course add'
    this.errorMsg = 'Error in add course'
    this.modalRef = this.bsmodalservice.show(form)
  }

  // Edit course
  onEdit(form: any) {
    this.title = 'Edit Course'
    this.successMsg = 'Course updated'
    this.errorMsg = 'Error in edit course'
    this.modalRef = this.bsmodalservice.show(form)
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

  changedItem(event: any) {
    this.onRefresh()
  }

}
