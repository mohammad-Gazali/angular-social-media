import { Component, effect, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signInForm!: FormGroup;
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    router: Router,
  ) {
    effect(() => {
      if (this.auth.user() !== null) {
        router.navigateByUrl('/')
      }
    })
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    this.loading.set(true);

    const formValue = this.signInForm.value;

    try {
      const result = await this.auth.signIn(formValue);
      if (result.error !== null) {
        this.snackbar.open(result.error.message, 'close', { duration: 7000 });
      } else {
        this.snackbar.open('Signed in successfuly', 'close', { duration: 7000 });
      }
    } catch (error) {
      this.snackbar.open(String(error), 'close', { duration: 7000 });
    }

    this.loading.set(false);
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
