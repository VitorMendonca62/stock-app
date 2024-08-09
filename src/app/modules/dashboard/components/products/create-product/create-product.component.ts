import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../../../../services/categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../../../services/products.service';
import { faX } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  @Output() newProductEvent = new EventEmitter<any>();
  @Output() disableFormsEvent = new EventEmitter<boolean>();

  faX = faX

  categories!: ICategory[];

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    category_id: new FormControl('i', [Validators.required]),
    price: new FormControl('0', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    amount: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories: ICategory[]) => {
        this.categories = categories;
      },
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.productsService
        .createProduct(this.formGroup.value as unknown as IProductCreate)
        .subscribe({
          next: () => {
            this.newProductEvent.emit({ sucess: true });
          },
          error: (error) => {
            this.newProductEvent.emit({ sucess: false, error });
          },
        });
    }
  }

  disableForms() {
    this.disableFormsEvent.emit(true)
  }
}
