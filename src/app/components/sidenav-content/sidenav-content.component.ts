import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutService } from '../../services/layout.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav-content',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatListModule, MatDividerModule, RouterLink],
  templateUrl: './sidenav-content.component.html',
  styleUrl: './sidenav-content.component.css'
})
export class SidenavContentComponent {
  loading = signal(false);

  constructor(public layout: LayoutService, public auth: AuthService, private snackbar: MatSnackBar) {}

  signOut() {
    this.loading.set(true);

    this.auth.signOut()
    .then(({error}) => {
      if (error !== null) {
        this.snackbar.open(error.message, 'close', { duration: 7000 })
      } else {
        this.snackbar.open('Signed out successfully.', 'close', { duration: 7000 })
      }
    })
    .catch(error => {
      this.snackbar.open(String(error), 'close', { duration: 7000 })
    })
    .finally(() => {
      this.loading.set(false);
    })
  }
}
