import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  products: Product[] = [];

  titleCard : string = "Carro Compra"; 

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products = this.service.findAll();
  }

}
