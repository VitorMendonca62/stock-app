import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<ICategory[]>('http://localhost:3333/categories', {
      headers: {
        authorization: localStorage.getItem('token') as string,
      },
    });
  }

  deleteCategory(id: string) {
    return this.http.delete<ICategory>(
      `http://localhost:3333/category/delete?category_id=${id}`,
      {
        headers: {
          authorization: localStorage.getItem('token') as string,
        },
      }
    );
  }

  createCategory(values: string) {
    return this.http.post<ICategory>('http://localhost:3333/category', {name: values}, {
      headers: {
        authorization: localStorage.getItem('token') as string,
      },
    });
  }
}
