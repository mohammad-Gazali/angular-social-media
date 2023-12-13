import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutService } from '../../services/layout.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-content',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatListModule, MatDividerModule, RouterLink],
  templateUrl: './sidenav-content.component.html',
  styleUrl: './sidenav-content.component.css'
})
export class SidenavContentComponent {
  constructor(public layout: LayoutService) {}
}
