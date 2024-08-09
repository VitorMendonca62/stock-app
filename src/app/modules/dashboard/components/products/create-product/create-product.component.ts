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

  faX = faX;
  message: string = 'Nada';
  messageVisible: boolean = false;
  isSucess: boolean = false;

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
            this.message = 'Produto cadastrado com sucesso';
            this.messageVisible = true;
            this.isSucess = true;

            setTimeout(() => {
              this.messageVisible = false;
            }, 2500);

            this.formGroup.reset();
            this.formGroup.controls.category_id.setValue("i")
            this.formGroup.controls.amount.setValue(0)
          },  
          error: (error) => {
            this.newProductEvent.emit({ sucess: false, error });
            this.message = error.error.error;
            this.messageVisible = true;
            this.isSucess = false;

            setTimeout(() => {
              this.messageVisible = false;
            }, 2500);
          },
        });
    }
  }

  disableForms() {
    this.disableFormsEvent.emit(true);
  }
}
