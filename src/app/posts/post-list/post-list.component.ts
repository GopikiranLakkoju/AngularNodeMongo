import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Array<Post> = [];
  private postsSub = new Subscription;
  isLoading: boolean = false;

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.isLoading = true;
    this.postsSub = this.postService.getPostsValue
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(id: string){
    this.postService.deletePost(id);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe() ;
  }
}
