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
          },
          error: (error: any) => {
            console.log(error);
            this.newCategoryEvent.emit({ sucess: false, error });
          },
        });
    }
  }

  disableForms() {
    this.disableFormsEvent.emit(true);
  }
}
