import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {

  @Input() products !: Product[];

}
