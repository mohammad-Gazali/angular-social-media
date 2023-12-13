import { Component } from '@angular/core';
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
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router'

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
  loading = false;

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    this.loading = true;

    const formValue = this.signInForm.value;

    try {
      const result = await this.supabase.signIn(formValue);
      if (result.error !== null) {
        this.snackbar.open(result.error.message, 'close');
      } else {
        this.snackbar.open('Signed in successfuly', 'close');
        this.router.navigateByUrl('/')
      }
    } catch (error) {
      this.snackbar.open(String(error), 'close');
    }

    this.loading = false;
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
