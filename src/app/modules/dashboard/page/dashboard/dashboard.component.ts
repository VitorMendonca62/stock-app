import { Component } from '@angular/core';
import { IEvent } from '../../components/products/products.component';

type Page = 'main' | 'products' | 'categories';
@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  page: Page = 'main';

  visibleForms = false;
  changeProducts = false;

  newPage(event: Page) {
    this.page = event;
  }

  createSale(event: IEvent) {
    console.log(event);
    this.changeProducts = true;

    setTimeout(() => {
      this.changeProducts = false;
    }, 1500);
  }

  togleForms() {
    this.visibleForms = !this.visibleForms;
  }
}
