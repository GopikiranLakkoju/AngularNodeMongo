import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(public postService: PostService) {}

  addPost(form: NgForm) {

    if (form.valid) {
      const post: Post = {
        id: '',
        title: form.value.title,
        context: form.value.context
      }
      this.postService.addPost(post);
      form.resetForm();
    }
  }
}
