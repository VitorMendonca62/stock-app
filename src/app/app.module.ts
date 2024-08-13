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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    SignInModule,
    SignUpModule,
    DashboardModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [provideRouter(routes), CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
