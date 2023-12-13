import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { SupabaseService } from '../../services/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatSidenavModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loading = false;

  constructor(public layout: LayoutService, public supabase: SupabaseService, private snackbar: MatSnackBar) {}

  signOut() {
    this.loading = true;

    this.supabase.signOut()
    .then(({error}) => {
      if (error !== null) {
        this.snackbar.open(error.message, "close")
      } else {
        this.snackbar.open("Signed out successfully.", "close")
      }
    })
    .catch(error => {
      this.snackbar.open(String(error), "close")
    })
    .finally(() => {
      this.loading = false
    })
  }
}
