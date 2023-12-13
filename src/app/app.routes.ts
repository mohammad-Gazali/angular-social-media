import { Routes } from "@angular/router";
import { HomeComponent, SigninComponent, SignupComponent } from "./pages";

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "signin", component: SigninComponent},
    {path: "signup", component: SignupComponent},
];
