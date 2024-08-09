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
  styleUrl: '../products/products.component.css',
})
export class CategoriesComponent implements OnInit {
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  visibleForms = false;
  page = 0;
  pages: number[] = [];
  message: string = 'Nada';
  messageVisible: boolean = false;
  isSucess: boolean = false;

  constructor(private categoriesService: CategoriesService) {}

  categories: ICategory[][] = [];

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

  togleForms() {
    this.visibleForms = !this.visibleForms;
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
