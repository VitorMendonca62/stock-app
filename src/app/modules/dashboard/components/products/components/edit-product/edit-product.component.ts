import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../services/categories.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from '../../../../../../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: '../create-product/create-product.component.css',
})
export class EditProductComponent implements OnChanges {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  @Output() editProductEvent = new EventEmitter<any>();
  @Output() disableFormsEvent = new EventEmitter<boolean>();
  @Input() product!: IProduct;

  faX = faX;

  categories!: ICategory[];

  message: string = 'Nada';
  messageVisible: boolean = false;
  isSucess: boolean = false;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    category_id: new FormControl('i', [Validators.required]),
    price: new FormControl('0', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    amount: new FormControl(1, [Validators.required, Validators.min(1 )]),
    product_id: new FormControl('0', [
      Validators.required,
      Validators.minLength(36),
      Validators.maxLength(36),
    ]),
  });

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroup.setValue({
      name: this.product.name,
      category_id: this.product.category.id,
      price: this.product.price,
      description: this.product.description,
      amount: this.product.amount,
      product_id: this.product.id,
    });
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
            this.editProductEvent.emit({ sucess: true });
            this.message = 'Produto editado com sucesso';
            this.messageVisible = true;
            this.isSucess = true;
            this.disableFormsEvent.emit(true);

            setTimeout(() => {
              this.messageVisible = false;
            }, 2500);
          },
          error: (error) => {
            this.editProductEvent.emit({ sucess: false, error });
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
