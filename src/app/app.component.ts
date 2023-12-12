import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { NavbarComponent } from "./components/navbar/navbar.component";


@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    imports: [CommonModule, MatButtonModule, RouterOutlet, NavbarComponent]
})
export class AppComponent {}
