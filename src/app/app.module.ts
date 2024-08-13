import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { SignInModule } from './modules/sign-in/sign-in.module';
import { SignUpModule } from './modules/sign-up/sign-up.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { ChartModule } from 'primeng/chart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    SignInModule,
    SignUpModule,
    DashboardModule,
    HttpClientModule,
    FontAwesomeModule,
    ChartModule,
    BrowserAnimationsModule,
  ],
  providers: [provideRouter(routes), CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
