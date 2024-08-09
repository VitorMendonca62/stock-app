import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  faPlus,
  faPencil,
  faTrash,
  faAnglesLeft,
  faAnglesRight,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from '../../../../services/products.service';

export interface IEvent {
  sucess: boolean;
  error?: any;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() changeProducts!: boolean;

  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  visibleForms = false;
  page = 0;
  pages: number[] = [];

  products: IProduct[][] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnChanges(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (response: IProduct[]) => {
        this.pages = [];
        let pages = 0;
        for (let i = 0; i <= response.length; i += 4) {
          this.products.push(response.slice(i, i + 4));
          pages += 1;
          this.pages.push(pages);
        }
        document.querySelector(`#page-${1}`)?.classList.add('page-selected');
      },
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe({
      next: (response) => {
        this.getProducts();
      },
    });
  }

  newProduct(event: IEvent) {
    if (event.sucess) {
      this.getProducts();
    }
  }

  togleForms() {
    this.visibleForms = !this.visibleForms;
  }

  changePageClass(page: number, oldPage: number) {
    document.querySelector(`#page-${page}`)?.classList.add('page-selected');
    document
      .querySelector(`#page-${oldPage}`)
      ?.classList.remove('page-selected');
  }

  changePageInPages(page: number) {
    const oldPage = this.page + 1;
    this.page = page - 1;

    this.changePageClass(page, oldPage);
  }
  changePageInAngles(weigth: 2 | 1, type: 'left' | 'rigth') {
    let newPage;
    const oldPage = this.page;

    if (type == 'left') newPage = this.page - weigth;
    else newPage = this.page + weigth;

    if (newPage > this.pages[this.pages.length - 1] - 1)
      newPage = this.pages[this.pages.length - 1] - 1;
    if (newPage < 1) newPage = 0;

    this.page = newPage;
    console.log(newPage + 1, oldPage + 1, newPage);

    if (newPage != oldPage) {
      this.changePageClass(newPage + 1, oldPage + 1);
    }
  }
}
