import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: '../products/create-product/create-product.component.css',
})
export class SaleComponent implements OnInit {
  @Output() newSaleEvent = new EventEmitter<any>();
  @Output() disableFormsEvent = new EventEmitter<boolean>();

  constructor(private productsService: ProductsService) {}

  faX = faX;
  visibleForms = true;
  products!: IProduct[];

  formGroup = new FormGroup({
    amount: new FormControl(1, [Validators.required, Validators.min(1)]),
    product_id: new FormControl('i', [Validators.required]),
  });

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (response: IProduct[]) => {
        this.products = response;
      },
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.productsService.createSale(this.formGroup.value as ISale).subscribe({
        next: (response) => {
          this.newSaleEvent.emit({ sucess: true });
        },
        error: (error: any) => {
          console.log(error);
          this.newSaleEvent.emit({ sucess: false, error });
        },
      });
    }
  }

  disableForms() {
    this.disableFormsEvent.emit(true);
  }
}
