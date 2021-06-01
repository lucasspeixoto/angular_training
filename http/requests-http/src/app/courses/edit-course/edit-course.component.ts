import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EMPTY, Observable, Subject } from 'rxjs';
import { delay, catchError, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Course } from '../courses-list/courses';
import { CoursesService } from '../courses.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  form: FormGroup;
  submitFlag: boolean = false;

  @Input('modalRef') modalRef: BsModalRef<any>
  @Input('course') course: any

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private alertModalService: AlertModalService,
    private bsmodalservice: BsModalService
  ) { }

  ngOnInit() {
    console.log(this.course)
    this.form = this.fb.group({
      id: [this.course.id],
      name: [this.course.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
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
    }
  }

  onCancel() {
    this.submitFlag = false;
    this.form.reset();
  }

  backToCourses() {
    this.bsmodalservice.hide();
    this.router.navigate(['courses']);
  }

  

}