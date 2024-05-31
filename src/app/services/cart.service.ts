import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private centralGreetMessage = new BehaviorSubject<string>('Hi 😎');

  private cartCount = new BehaviorSubject<number>(0);
  cartItems: any[] = [];

  constructor() {}

  setCentralMsg(params: string) {
    this.centralGreetMessage.next(`Hi 👋 ${params}`);
  }

  getCentralMsg() {
    return this.centralGreetMessage.asObservable();
  }

  setCartCount() {
    this.cartItems.push('Hi');
    this.cartCount.next(this.cartItems.length);
  }

  getCartCount() {
    return this.cartCount.asObservable();
  }
}
