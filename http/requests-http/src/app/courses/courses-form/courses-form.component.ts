import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { delay } from 'rxjs/operators';
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
    this.route.params.subscribe((params: any) => {
      const id = params.id;
      const course$ = this.coursesService.loadByID(id);
      course$.subscribe((course) => {
        this.updateForm(course);
      });
    });

    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
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
    if (this.form.valid) {
      this.coursesService.create(this.form.value).subscribe(
        (success) => {
          this.alertModalService.showAlertSuccess('Course add');
        },
        (Error) => this.alertModalService.showAlertInfo(`Error`)
      );
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
  // Create course
  create(crudForm: any) {
    this.modalRef = this.bsmodalservice.show(crudForm);
    
  }

}
