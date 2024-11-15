import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../model/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',

})
export class CartComponent {

  @Input() items: CartItem[] = [];

  @Input() total = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  titleCart: string = "Cart";

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id)
  }

}
