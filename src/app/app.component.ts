import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { LayoutService } from './services/layout.service';
import { SidenavContentComponent } from './components/sidenav-content/sidenav-content.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent, MatSidenavModule, SidenavContentComponent]
})
export class AppComponent {
    @ViewChild('drawer') sidenav!: MatSidenav;

    constructor(private layout: LayoutService) {}

    ngAfterViewInit() {
        this.layout.setSidenav(this.sidenav);
    }
}
