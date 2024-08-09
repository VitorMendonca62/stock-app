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

  constructor(private categoriesService: CategoriesService) {}

  categories: ICategory[][] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.pages = [];
        let pages = 0;
        for (let i = 0; i <= response.length; i += 4) {
          this.categories.push(response.slice(i, i + 4));
          pages += 1;
          this.pages.push(pages);
        }
        document.querySelector(`#page-${1}`)?.classList.add('page-selected');
      },
    });
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe({
      next: (response) => {
        this.getCategories();
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

  changePageClass(page: number, oldPage: number) {
    document.querySelector(`#page-${page}`)?.classList.add('page-selected');
    document
      .querySelector(`#page-${oldPage}`)
      ?.classList.remove('page-selected');
  }

  changePageInPages(page: number) {
    const oldPage = this.page + 1;
    this.page = page - 1;

    this.changePageClass(page, oldPage);
  }
  changePageInAngles(weigth: 2 | 1, type: 'left' | 'rigth') {
    let newPage;
    const oldPage = this.page;

    if (type == 'left') newPage = this.page - weigth;
    else newPage = this.page + weigth;

    if (newPage > this.pages[this.pages.length - 1] - 1)
      newPage = this.pages[this.pages.length - 1] - 1;
    if (newPage < 1) newPage = 0;

    this.page = newPage;
    console.log(newPage + 1, oldPage + 1, newPage);

    if (newPage != oldPage) {
      this.changePageClass(newPage + 1, oldPage + 1);
    }
  }
}
