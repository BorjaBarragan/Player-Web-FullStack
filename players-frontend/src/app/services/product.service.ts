import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { products } from '../data/product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  findAll(): Product [] {
    return products;
  }
}
