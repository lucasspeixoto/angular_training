import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogService } from 'src/app/services/blog.service';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { DeletePostComponent } from './components/delete-post/delete-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewPostComponent,
    EditPostComponent,
    DeletePostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [BlogService, BsModalService],
  bootstrap: [AppComponent],
  //entryComponents:[AddNewPostComponent, DeletePostComponent, EditPostComponent]
})
export class AppModule { }