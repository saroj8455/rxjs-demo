import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private centralGreetMessage = new BehaviorSubject<string>('Hi 😎');

  constructor() {}

  setCentralMsg(params: string) {
    this.centralGreetMessage.next(`Hi 👋 ${params}`);
  }

  getCentralMsg() {
    return this.centralGreetMessage.asObservable();
  }
}
