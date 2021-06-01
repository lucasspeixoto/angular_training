import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogService{
    private readonly baseURL: string;

    postIdSource = new  BehaviorSubject<number>(0);
    postIdData: any;

    constructor(private http: HttpClient){
        this.baseURL ="https://localhost:3000/postlist/";
        this.postIdData= this.postIdSource.asObservable();
    }

    getCategoryList(){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL + "getcategories", { headers: header})
    }

    getPostList(){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL + "getposts", { headers: header})
    }

    addPost(post: any){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post(this.baseURL + "addpost", post, { headers: header})
    }
    
    deletePost(postId: number){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post(this.baseURL + "deletepost?postId="+postId, { headers: header})
    }

    updatePost(post: any){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post(this.baseURL + "updatepost", post, { headers: header})
    }

    getPost(postId: number){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL + "getpost?postId="+ postId, { headers: header})
    }

    changePostId(postId: number){
        this.postIdSource.next(postId);
    }
}