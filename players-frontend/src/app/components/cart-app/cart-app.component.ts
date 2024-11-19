import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent, CommonModule],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];
  total: number = 0;
  totalItems: number = 0;
  showCart: boolean = false;
  title: string = 'Store'; 

  constructor(private productService: ProductService, public cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.productService.findAll();
    this.updateCartInfo();
  }

  addCart(product: Product): void {
    this.cartService.addCartItem({ product, quantity: 1 });
    this.updateCartInfo();
    console.log('Se ha añadido : ', product, 'desde cart-app');
  }

  deleteCart(id: number, product: Product): void {
    this.cartService.deleteCartItem(id);
    this.updateCartInfo();
    console.log('Se ha eliminado : ', product, 'desde cart-app');
  }

  private updateCartInfo(): void {
    this.total = this.cartService.calculateTotal();
    this.totalItems = this.cartService.calculateTotalItems();
  }

  openCart(): void {
    this.showCart = !this.showCart;
  }
}
