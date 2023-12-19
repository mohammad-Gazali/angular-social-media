import { Component, ViewChild, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploaderComponent } from '../../../components/file-uploader/file-uploader.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FileUploaderComponent,
    FormsModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  content = '';
  files = signal<(string | undefined | null)[]>([]);
  loading = signal(false);
  validFiles = computed(() =>
    this.files().every((file) => file !== null && file !== undefined)
  );
  @ViewChild('form') form!: NgForm;

  constructor(private post: PostService, private snackbar: MatSnackBar) {}

  onDataFlow(files: (string | undefined | null)[]) {
    this.files.set(files);
  }

  onSubmit() {
    if (!this.validFiles()) {
      return;
    }
    if (!this.content) return;

    this.loading.set(true);

    this.post
      .createPost({
        text: this.content,
        imagesUrls: this.files() as string[],
      })
      .then((res) => {
        if (res !== null && res !== undefined) {
          this.snackbar.open(String(res.error), 'close', { duration: 7000 });
        }
        this.snackbar.open('Post created successfully.', 'close', {
          duration: 7000,
        });
        this.post.fetchLastPost();
        this.form.resetForm();
      })
      .catch((err) => {
        console.log(err);
        this.snackbar.open(String(err), 'close', { duration: 7000 });
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
