import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../common';
import { map, tap } from 'rxjs';

export interface CustomizeResponse {
  rating: number;
  catrgory: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor() {}

  products() {
    return this.http.get(this.apiUrl).pipe(
      map((res) => res as Product[]),
      tap((res) => console.log('capture products')),
      map((products) => {
        return products.map((product) => {
          return {
            rating: product.rating.rate,
            catrgory: product.category,
          } as CustomizeResponse;
        });
      })
    );
  }
}
