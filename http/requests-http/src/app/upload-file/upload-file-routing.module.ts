import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';

const UploadRoutes: Routes = [
  {path: '', component: UploadFileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(UploadRoutes)],
  exports: [RouterModule]
})
export class UploadFileRoutingModule { }
