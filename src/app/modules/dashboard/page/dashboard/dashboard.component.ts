import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../components/products/products.component';
import { CookieService } from 'ngx-cookie-service';
import { Route, Router } from '@angular/router';

type Page = 'main' | 'products' | 'categories';
@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  page: Page = 'main';

  visibleForms = false;
  changeProducts = false;

  ngOnInit(): void {
    // if (!this.cookieService.get('AUTH_USER')) {
    //   this.router.navigate(['login']);
    // }
  }

  newPage(event: Page) {
    this.page = event;
  }

  createSale(event: IEvent) {
    this.changeProducts = true;

    setTimeout(() => {
      this.changeProducts = false;
    }, 1500);
  }

  togleForms() {
    this.visibleForms = !this.visibleForms;
  }
}
