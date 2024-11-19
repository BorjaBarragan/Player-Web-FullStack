import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../model/cartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',

})
export class CartComponent implements OnInit {

  @Input() items: CartItem[] = [];

  @Input() total = 0;

  @Input() totalItems: number = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  @Input() showTitleCart: boolean = false;

  title: string = "Cart";

  constructor(private cartService: CartService,) {

  }
  ngOnInit(): void {
    //history.state es una propiedad que contiene el estado de navegacion.
    const state = history.state;
    //comprobamos si el state contiene showTitleCart, si esta se le asigna un valor a la propiedad showTitleCart.
    if (state && state.showTitleCart !== undefined) {
      this.showTitleCart = state.showTitleCart;
      console.log("Abrimos carrito desde navbar. [showTitleCart] = " , this.showTitleCart);
    } else {
      console.log("Abrimos carrito desde navbar. [showTitleCart] = " , this.showTitleCart);
    }
    this.items = this.cartService.getCartItems();
    this.updateCartInfo();
  }


  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
    this.cartService.deleteCartItem(id);
    this.items = this.cartService.getCartItems();
    this.updateCartInfo();
    console.log('Se ha eliminado el producto: ', id, 'desde cart');
  }

  private updateCartInfo(): void {
    this.total = this.cartService.calculateTotal();
    this.totalItems = this.cartService.calculateTotalItems();
  }

}
