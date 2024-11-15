import { Injectable } from '@angular/core';
import { CartItem } from '../model/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  constructor() {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }


  getCartItems(): CartItem[] {
    return this.cartItems;
  }


  addCartItem(product: CartItem): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push(product);
    }
    this.saveCart();
  }

  deleteCartItem(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  calculateTotal(): number {
    return this.cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0);
  }

  calculateTotalItems(): number {
    return this.cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
  }

  private saveCart(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
