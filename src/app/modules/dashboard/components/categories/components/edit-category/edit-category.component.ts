import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from '../../../../../../services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl:
    '../../../products/components/create-product/create-product.component.css',
})
export class EditCategoryComponent implements OnChanges {
  constructor(private categoriesService: CategoriesService) {}
  @Input() category!: ICategoryEdit;
  @Output() editCategoryEvent = new EventEmitter<any>();
  @Output() disableFormsEvent = new EventEmitter<boolean>();

  faX = faX;
  message: string = 'Nada';
  messageVisible: boolean = false;
  isSucess: boolean = false;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    categoryId: new FormControl('a', [
      Validators.required,
      Validators.minLength(36),
      Validators.maxLength(36),
    ]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroup.setValue({
      name: this.category.name,
      categoryId: this.category.categoryId,
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.categoriesService
        .editCategory(this.formGroup.value as ICategoryEdit)
        .subscribe({
          next: (response) => {
            this.editCategoryEvent.emit({ sucess: true });

            this.message = 'Categoria editada com sucesso';
            this.messageVisible = true;
            this.isSucess = true;

            this.disableFormsEvent.emit(true);

            setTimeout(() => {
              this.messageVisible = false;
            }, 2500);

            this.formGroup.reset();
          },
          error: (error: any) => {
            this.editCategoryEvent.emit({ sucess: false, error });
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
