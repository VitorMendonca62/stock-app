import { Routes } from '@angular/router';
import { SignInComponent } from './modules/sign-in/page/sign-in.component';
import { SignUpComponent } from './modules/sign-up/page/sign-up.component';
import { DashboardComponent } from './modules/dashboard/page/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', component: SignInComponent, },
  { path: 'cadastro', component: SignUpComponent, },
  { path: 'dashboard', component: DashboardComponent, }
];
