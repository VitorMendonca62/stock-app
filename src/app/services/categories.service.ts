import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: {
        authorization: localStorage.getItem('token') as string,
      },
    };
  }

  getCategories() {
    return this.http.get<ICategory[]>(
      'http://localhost:3333/categories',
      this.getHeaders()
    );
  }

  deleteCategory(id: string) {
    return this.http.delete<ICategory>(
      `http://localhost:3333/category/delete?category_id=${id}`,
      this.getHeaders()
    );
  }

  createCategory(values: string) {
    return this.http.post<ICategory>(
      'http://localhost:3333/category',
      { name: values },
      this.getHeaders()
    );
  }

  editCategory(values: ICategoryEdit) {
    return this.http.put<ICategory>(
      `http://localhost:3333/category/edit?category_id=${values.categoryId}`,
      { name: values.name },
      this.getHeaders()
    );
  }
}
