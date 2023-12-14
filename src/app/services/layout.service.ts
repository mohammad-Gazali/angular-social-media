import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidenav = signal<MatSidenav | undefined>(undefined);
  public isSmall = signal(false);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ])
    .subscribe(result => {
      this.isSmall.set(result.matches);
      if (!result.matches) {
        this.sidenav()?.close();
      }
    })
  }

  setSidenav(sidenav: MatSidenav): void {
    this.sidenav.set(sidenav);
  }

  openSidenav(): void {
    const sidenav = this.sidenav();
    if (sidenav !== undefined && this.isSmall()) {
      sidenav.open();
    }
  }

  closeSidenav(): void {
    const sidenav = this.sidenav();
    if (sidenav !== undefined && this.isSmall()) {
      sidenav.close();
    }
  }
}
