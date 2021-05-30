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
    this.courses$ = this.service.list()
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

    //Caso use subscrible 1:
    /*  this.service.list().subscribe(
      data => {
        console.log(data)
      },
      error => console.error(error),
      () => console.log('Observable completo!')
    )
 */
    //Caso use subscrible 2
    /* this.courses$ = this.service.list()
      .pipe(
        //map(),
        //tap(),
        //switchMap(),
        catchError(error => {
          console.error(error);
          this.error$.next(true)
          return EMPTY
        })
      ) */
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar, tente novamente mais tarde.')
  }

  // Create course
  create(crudForm: any) {
    this.modalRef = this.bsmodalservice.show(crudForm)
  }

  onEdit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }

  open(crudForm: any) {
    this.modalRef = this.bsmodalservice.show(crudForm);
  }



}
