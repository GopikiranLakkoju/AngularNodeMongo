import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
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

  setPosts(value: Post[]) {
    this._posts.next(value);
  }

  addPost(post: Post): void {
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((data) => {
        console.log(data);
        post.id = data.postId;
        this.userPosts.push(post);
        this.setPosts([...this.userPosts]);
      });
  }

  deletePost(id: string) {
    this.http.delete(`http://localhost:3000/api/posts/${id}`)
    .subscribe(() => {
        this.userPosts = this.userPosts.filter(post => post.id !== id);
        this.setPosts([...this.userPosts]);
    });
  }
}
