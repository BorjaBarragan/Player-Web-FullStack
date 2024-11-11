import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product !: Product ;

}