import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from '../../../../../../services/categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: '../../../products/create-product/create-product.component.css',
})
export class CreateCategoryComponent {
  constructor(private categoriesService: CategoriesService) {}

  @Output() newCategoryEvent = new EventEmitter<any>();
  @Output() disableFormsEvent = new EventEmitter<boolean>();

  faX = faX;
  message: string = 'Nada';
  messageVisible: boolean = false;
  isSucess: boolean = false;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  onSubmit() {
    if (this.formGroup.valid) {
      this.categoriesService
        .createCategory(this.formGroup.value.name as string)
        .subscribe({
          next: (response) => {
            this.newCategoryEvent.emit({ sucess: true });
      
            this.message = 'Categoria cadastrada com sucesso';
            this.messageVisible = true;
            this.isSucess = true;

            setTimeout(() => {
              this.messageVisible = false;
            }, 2500);

            this.formGroup.reset();

          },
          error: (error: any) => {
            this.newCategoryEvent.emit({ sucess: false, error });
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
