import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { delay, map, switchMap, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Course } from '../courses-list/courses';
import { CoursesService } from '../courses.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
})
export class CoursesFormComponent implements OnInit {

  form: FormGroup;
  submitFlag: boolean = false;

  @Input('modalRef') modalRef: BsModalRef<any>

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private alertModalService: AlertModalService,
    private bsmodalservice: BsModalService
  ) { }

  ngOnInit() {
    /* this.route.params.subscribe(
      (params: any) => {
        const id = params.id;
        const course$ = this.coursesService.loadByID(id);
        course$.subscribe(course => {
          this.updateForm(course);
        });
      }); */

    /* this.route.params //subscribe dentro do route.params, o Angular que vai fazer a desinscrição
      .pipe(
        map((params: any) => params.id),
        switchMap(id => this.coursesService.loadByID(id)))
        //switchMap(course => obterAulas) caso seja necessário obter outras informações do servidor
      .subscribe(course => this.updateForm(course)) */

    //Graças ao resolve, todo conteúdo de curso está nessa variável
    const course = this.route.snapshot.data['course']


    //concatMap -> ordem da requisição importa
    //mergeMap -> ordem não importa
    //exhaustMap -> casos de login

    this.form = this.fb.group({
      id: [course.id],
      name: [course.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  ngOnDestroy(): void {
    console.log('Destruido form component')

  }

  updateForm(course: any) {
    this.form.patchValue({
      id: course.id,
      name: course.name,
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitFlag = true;
    //console.log(this.form.value);
    //Caso formulário esteja válido
    if (this.form.valid) {
      let successMsg = 'Course add'
      let errorMsg = 'Error in create course'
      if (this.form.value.id) {
        successMsg = 'Course Update'
        errorMsg = 'Error in edit course'
      }
      this.coursesService.save(this.form.value)
        .subscribe(
          (success) => {
            this.alertModalService.showAlertSuccess('Course update');
            this.router.navigate(['courses']);
          },
          (error) => {
            this.alertModalService.showAlertInfo(`Error`)
          }
        )

      /*  //Caso exista id (update ou delete)
       if (this.form.value.id) {
         //update
         this.coursesService.update(this.form.value).subscribe(
           (success) => {
             this.alertModalService.showAlertSuccess('Course update');
             this.router.navigate(['courses']);
           },
           (Error) => this.alertModalService.showAlertInfo(`Error`)
         );
       } else {
         //Add
         this.coursesService.create(this.form.value).subscribe(
           (success) => {
             this.alertModalService.showAlertSuccess('Course add');
             this.router.navigate(['courses']);
           },
           (Error) => this.alertModalService.showAlertInfo(`Error`)
         );
       } */
    }
  }

  onCancel() {
    this.submitFlag = false;
    this.form.reset();
  }

  backToCourses() {
    this.router.navigate(['courses']);
  }

  // Create course
  create(crudForm: any) {
    this.modalRef = this.bsmodalservice.show(crudForm);
  }

}
