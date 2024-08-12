import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      'http://localhost:3333/products',
      this.getHeaders()
    );
  }
  deleteProduct(id: string) {
    return this.http.delete<IProduct>(
      `http://localhost:3333/product/delete?product_id=${id}`,
      this.getHeaders()
    );
  }

  createProduct(values: IProductCreate) {
    return this.http.post<IProduct>(
      'http://localhost:3333/product',
      values,
      this.getHeaders()
    );
  }

  editProduct(values: IProductCreate) {
    return this.http.put<IProduct>(
      'http://localhost:3333/product',
      values,
      this.getHeaders()
    );
  }

  createSale(values: ISale) {
    return this.http.put<IProduct>(
      `http://localhost:3333/product/sale?product_id=${values.product_id}`,
      { amount: values.amount },
      this.getHeaders()
    );
  }

}
