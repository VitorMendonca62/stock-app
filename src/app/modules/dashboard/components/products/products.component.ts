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
import { map } from 'rxjs';

export interface IEvent {
  sucess: boolean;
  error?: any;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  @Input() changeProducts!: boolean;

  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  visibleCreateProductForms = false;
  visibleEditProductForms = false;
  page = 0;
  pages: number[] = [];
  message: string = 'Nada';
  messageVisible: boolean = false;
  isSucess: boolean = false;

  products: IProduct[][] = [];
  productEdit!: IProduct;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService
      .getProducts()
      .pipe(map((products) => products.filter((product) => product.amount > 0)))
      .subscribe({
        next: (response: IProduct[]) => {
          this.pages = [];
          this.products = [];
          let pages = 0;
          for (let i = 0; i < response.length; i += 4) {
            this.products.push(response.slice(i, i + 4));
            pages += 1;

            this.pages.push(pages);
          }
        },
      });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe({
      next: (response) => {
        this.getProducts();
        this.message = 'Produto deletado com sucesso';
        this.messageVisible = true;
        this.isSucess = true;

        setTimeout(() => {
          this.messageVisible = false;
        }, 2500);
      },
      error: (error) => {
        this.message = error.error.error;
        this.messageVisible = true;
        this.isSucess = false;

        setTimeout(() => {
          this.messageVisible = false;
        }, 2500);
      },
    });
  }

  newProduct(event: IEvent) {
    if (event.sucess) {
      this.getProducts();
    }
  }

  togleForms(forms: 'visibleCreateProductForms' | 'visibleEditProductForms') {
    this[forms] = !this[forms];
  }

  changePageInPages(page: number) {
    this.page = page - 1;
  }

  changePageInAngles(weigth: 2 | 1, type: 'left' | 'rigth') {
    let newPage;

    if (type == 'left') newPage = this.page - weigth;
    else newPage = this.page + weigth;

    if (newPage > this.pages[this.pages.length - 1] - 1)
      newPage = this.pages[this.pages.length - 1] - 1;
    if (newPage < 1) newPage = 0;

    this.page = newPage;
  }

  showEditForms(product: IProduct) {
    this.productEdit = product;
  }
}
