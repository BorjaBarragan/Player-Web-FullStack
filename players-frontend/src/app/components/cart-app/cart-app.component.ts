import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../model/cartItem';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  titleStore: string = "Store";

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.calculateTotal();
  }

  onAddCart(product: Product): void {
    const hasItem = this.items.find(item => item.product.id === product.id);
    if (hasItem) {
      //map devuelve una nueva instancia de los items modificado.
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id !== id);
    this.calculateTotal()
  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0)
  }
}
