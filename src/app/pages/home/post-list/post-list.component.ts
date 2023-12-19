import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, NgImageSliderModule, DatePipe],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  constructor(public postService: PostService, public auth: AuthService) {}

  ngOnInit() {
    this.postService.fetchPosts();
  }
}
