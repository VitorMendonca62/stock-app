import { Component, OnInit } from '@angular/core';
import {
  faPencil,
  faPlus,
  faTrash,
  faAnglesLeft,
  faAnglesRight,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from '../../../../services/categories.service';

interface IEvent {
  sucess: boolean;
  error?: any;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: [
    '../products/products.component.css',
    './categories.component.css',
  ],
})
export class CategoriesComponent implements OnInit {
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  visibleCreateForms = false;
  visibleEditForms = false;

  page = 0;
  pages: number[] = [];
  message: string = 'Nada';
  messageVisible: boolean = false;
  isSucess: boolean = false;

  categories: ICategory[][] = [];
  category!: ICategoryEdit;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.pages = [];
        this.categories = [];
        let pages = 0;
        for (let i = 0; i < response.length; i += 4) {
          this.categories.push(response.slice(i, i + 4));
          pages += 1;
          this.pages.push(pages);
        }
      },
    });
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe({
      next: (response) => {
        this.getCategories();
        this.message = 'Categoria deletada com sucesso';
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

  createCategory(event: IEvent) {
    if (event.sucess) {
      this.getCategories();
    }
  }

  editCategory(category: ICategoryEdit) {
    this.category = category;
  }

  togleForms(forms: 'visibleCreateForms' | 'visibleEditForms') {
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
}
