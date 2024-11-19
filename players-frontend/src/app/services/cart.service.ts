import { Injectable } from '@angular/core';
import { CartItem } from '../model/cartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  private totalItemsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    const savedCart = sessionStorage.getItem('cart');
    console.log('Carrito cargado desde sessionStorage:', savedCart);
    if (savedCart) {
      //parse ->  para convertir ese string en formato JSON de vuelta a un array de objetos en JS.
      this.cartItems = JSON.parse(savedCart);
      this.updateTotalItems();
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  //nuevo
  get totalItems() {
    return this.totalItemsSubject.asObservable();
  }

  addCartItem(product: CartItem): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push(product);
    }
    this.updateTotalItems()
    this.saveCart();
  }

  deleteCartItem(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateTotalItems()
    this.saveCart();
  }

  calculateTotal(): number {
    return this.cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0);
  }

  calculateTotalItems(): number {
    return this.cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
  }

  private updateTotalItems(): void {
    const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalItemsSubject.next(totalItems);
  }

  private saveCart(): void {
    //.stringify -> para almacenarlo en el sessionStorage necesitamos un formato JSON
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
