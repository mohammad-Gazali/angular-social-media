import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatSidenavModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
