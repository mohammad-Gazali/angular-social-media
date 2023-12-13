import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sideNav: MatSidenav | undefined;
  public isSmall = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ])
    .subscribe(result => {
      this.isSmall = result.matches;
      if (!this.isSmall) {
        this.sideNav?.close();
      }
    })
  }

  setSidenav(sidenav: MatSidenav): void {
    this.sideNav = sidenav;
  }

  openSidenav(): void {
    if (this.sideNav && this.isSmall) {
      this.sideNav.open();
    }
  }

  closeSidenav(): void {
    if (this.sideNav && this.isSmall) {
      this.sideNav.close();
    }
  }
}
