import { Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { DeletePostComponent } from './components/delete-post/delete-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular CRUD Example';
  postList: any[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private blogService: BlogService, 
    private bsModalService: BsModalService
    ) {
    this.getPosts();
  }

  getPosts() {
    this.blogService.getPostList().subscribe(data => {
      //Object.assign(this.postList, data);
      console.log(data)
    }, error => {
      console.log("Error while getting posts ", error);
    });
  }

  addNewPost() {
    this.bsModalRef = this.bsModalService.show(AddNewPostComponent);
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == 'OK') {
        this.getPosts();
      }
    });
  }

  deletePost(postId: number, title: string) {
    this.bsModalRef = this.bsModalService.show(DeletePostComponent);
    this.bsModalRef.content.postId = postId;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.event.subscribe((result: any) => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
          this.postList = [];
          this.getPosts();
        }, 5000);
      }
    });
  }

  editPost(postId: number) {
    this.blogService.changePostId(postId);
    this.bsModalRef = this.bsModalService.show(EditPostComponent);
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == 'OK') {
        setTimeout(() => {
          this.getPosts();
        }, 5000);
      }
    });
  }
}