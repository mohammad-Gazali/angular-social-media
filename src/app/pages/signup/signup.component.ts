import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    this.loading = true;

    const formValue = this.signUpForm.value;

    try {
      const result = await this.supabase.signUp(formValue);
      if (result.error !== null) {
        this.snackbar.open(result.error.message, 'close');
      } else {
        this.snackbar.open('Created user successfuly, please verfiy your email.', 'close');
        this.router.navigateByUrl('/')
      }
    } catch (error) {
      this.snackbar.open(String(error), 'close');
    }

    this.loading = false;
  }

  get name() {
    return this.signUpForm.get("name")
  }

  get email() {
    return this.signUpForm.get("email");
  }

  get password() {
    return this.signUpForm.get("password");
  }
}
