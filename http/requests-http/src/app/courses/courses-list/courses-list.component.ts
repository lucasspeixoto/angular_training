import { Component, OnInit } from '@angular/core';
import { Course } from './courses';

import { CoursesService } from './../courses.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  //courses: Course[]


  courses$: Observable<Course[]>; // $ significar que a variável é um observable
  error$ = new Subject<boolean>();
  bsModalRef: BsModalRef

  constructor(
    private service: CoursesService,
    private modalService: BsModalService
    ) {}

  /* Mesmo após a destruição do componente, pode ser que a inscrição no
   observable continue, consumindo memória, precisamos destruir
   */
  ngOnInit(): void {
    //this.service.list().subscribe(data => this.courses = data)
    this.onRefresh();
  }

  onRefresh() {
    this.courses$ = this.service.list()
    .pipe(
      catchError((error) => {
        console.error(error);
        //this.error$.next(true);
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
    this.bsModalRef = this.modalService.show(AlertModalComponent)
    this.bsModalRef.content.type = 'danger'
    this.bsModalRef.content.message = 'Erro ao carregar Cursos, tente novamente mais tarde.'
  }
}
