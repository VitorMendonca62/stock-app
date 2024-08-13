import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment"

const API_URL = environment.apiUrl
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
      `${API_URL}categories`,
      this.getHeaders()
    );
  }

  deleteCategory(id: string) {
    return this.http.delete<ICategory>(
      `${API_URL}category/delete?category_id=${id}`,
      this.getHeaders()
    );
  }

  createCategory(values: string) {
    return this.http.post<ICategory>(
      `${API_URL}category`,
      { name: values },
      this.getHeaders()
    );
  }

  editCategory(values: ICategoryEdit) {
    return this.http.put<ICategory>(
      `${API_URL}category/edit?category_id=${values.categoryId}`,
      { name: values.name },
      this.getHeaders()
    );
  }
}
