import { Routes } from '@angular/router';
import { SignInComponent } from './modules/sign-in/page/sign-in.component';
import { SignUpComponent } from './modules/sign-up/page/sign-up.component';
import { DashboardComponent } from './modules/dashboard/page/dashboard/dashboard.component';
import { AuthGuard, NoAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SignInComponent, canActivate: [NoAuthGuard] },
  { path: 'cadastro', component: SignUpComponent, canActivate: [NoAuthGuard]},
];
