import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Post } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private id: any;
  post: any;
  isLoading: boolean = false;

  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.postService.getPost(this.id)
          .subscribe(postData => {
            this.isLoading = false;
            this.post = { id: postData._id, title: postData.title, context: postData.context };
          });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  savePost(form: NgForm) {

    if (form.valid) {
      const post: Post = {
        id: '',
        title: form.value.title,
        context: form.value.context
      }

      this.isLoading = true;
      if (this.mode === 'create') {
        this.postService.addPost(post);
      } else {
        post.id = this.id;
        this.postService.updatePost(post);
      }

      form.resetForm();
    }
  }
}
