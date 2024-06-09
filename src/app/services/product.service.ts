import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FakeResponse, IProduct, Product, Root } from '../common';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

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

  // declarative pattern
  private productSelectedSubject = new BehaviorSubject<number>(1);
  productSelectedAction = this.productSelectedSubject.asObservable();
  private productUrl = 'https://dummyjson.com/products';

  // Phase I
  products$ = this.http.get(this.productUrl).pipe(
    tap((resp) => console.log('capture', resp)),
    map((resp) => resp as FakeResponse),
    // map((resp) => resp as unknown as FakeResponse),
    map((resp) => resp.products)
  );

  product$ = this.productSelectedAction.pipe(
    switchMap((prodId) => this.http.get(`${this.productUrl}/${prodId}`)),
    tap((resp) => console.log('capture single', resp)),
    map((resp) => resp as Root)
    // map((resp) => resp.products)
  );

  constructor() {}

  setProductId(selectedId: number) {
    console.log(selectedId);

    this.productSelectedSubject.next(selectedId);
  }

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
