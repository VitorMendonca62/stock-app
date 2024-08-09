import { Component, EventEmitter, Output } from '@angular/core';
import {
  faHome,
  faSignOut,
  faCartShopping,
  faBarcode,
  faTag,
} from '@fortawesome/free-solid-svg-icons';

type Page = 'main' | 'products' | 'categories';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faHome = faHome;
  faCartShopping = faCartShopping;
  faBarcode = faBarcode;
  faTag = faTag;
  faSignOut = faSignOut;

  constructor() {}

  @Output() newPageEvent = new EventEmitter<Page>();
  @Output() enableFormsEvent = new EventEmitter<boolean>();

  changePage(newPage: Page) {
    this.newPageEvent.emit(newPage);
  }

  enableForms() {
    this.enableFormsEvent.emit(true);
  }
}
