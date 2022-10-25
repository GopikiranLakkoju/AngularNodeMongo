import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts = new Subject<Post[]>();
  private userPosts: Post[] = [];
  private baseUrl: string = 'http://localhost:3000/api/posts'

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http.get<{ message: string, posts: any }>(this.baseUrl)
      .pipe(map((postData) => {
        return postData.posts.map((post: { title: any; context: any; _id: any; }) => {
          return {
            title: post.title,
            context: post.context,
            id: post._id
          };
        });
      }))
      .subscribe(posts => {
        this.userPosts = posts;
        this.setPosts([...this.userPosts]);
      });
  }

  get getPostsValue(): Observable<Post[]> {
    return this._posts;
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, context: string }>(`${this.baseUrl}/${id}`);
  }

  setPosts(value: Post[]) {
    this._posts.next(value);
  }

  addPost(post: Post): void {
    this.http.post<{ message: string, postId: string }>(this.baseUrl, post)
      .subscribe((data) => {
        console.log(data);
        post.id = data.postId;
        this.userPosts.push(post);
        this.setPosts([...this.userPosts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(post: Post): void {
    this.http.put(`${this.baseUrl}/${post.id}`, post)
      .subscribe(response => {
        const updatedPosts = [...this.userPosts];
        const oldPostIndex = updatedPosts.findIndex(x => x.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.userPosts = updatedPosts;
        this.setPosts([...this.userPosts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(id: string) {
    this.http.delete(`${this.baseUrl}/${id}`)
      .subscribe(() => {
        this.userPosts = this.userPosts.filter(post => post.id !== id);
        this.setPosts([...this.userPosts]);
      });
  }
}
