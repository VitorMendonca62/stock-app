import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment"

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: {
        authorization: localStorage.getItem('token') as string,
      },
    };
  }

  getProducts() {
    return this.http.get<IProduct[]>(
      `${API_URL}products`,
      this.getHeaders()
    );
  }
  deleteProduct(id: string) {
    return this.http.delete<IProduct>(
      `${API_URL}product/delete?product_id=${id}`,
      this.getHeaders()
    );
  }

  createProduct(values: IProductCreate) {
    return this.http.post<IProduct>(
      `${API_URL}product`,
      values,
      this.getHeaders()
    );
  }

  editProduct(values: IProductCreate) {
    return this.http.put<IProduct>(
      `${API_URL}product`,
      values,
      this.getHeaders()
    );
  }

  createSale(values: ISale) {
    return this.http.put<IProduct>(
      `${API_URL}product/sale?product_id=${values.product_id}`,
      { amount: values.amount },
      this.getHeaders()
    );
  }

}
