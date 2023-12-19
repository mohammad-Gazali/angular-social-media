import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CreatePostComponent } from "./create-post/create-post.component";
import { PostService } from '../../services/post.service';
import { PostListComponent } from "./post-list/post-list.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CreatePostComponent, PostListComponent]
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
