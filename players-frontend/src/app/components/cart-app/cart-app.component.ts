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
    //JSON.parse convierte una cadena de texto en formato JSON de nuevo en un objeto o array de JavaScript.
    //La expresión || [] se utiliza como una medida de seguridad para asegurar que this.items tenga siempre
    // un valor válido, incluso si no hay nada guardado en sessionStorage
    //añadimos !, para eliminar el posible error y asegurar al codigo de que siempre contendrá un dato.
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    //colocamos el calculateTotal al final, ya que sino el sessionStorage pierde la cantidad y queda en 0 al actualizar.
    this.calculateTotal();
  }

  onAddCart(product: Product): void {
    //find, buscamos si ya existe el producto que hay en el carrito, con el que queremos agregar (el que entra por parametro.)
    const hasItem = this.items.find(item => item.product.id === product.id);
    //si ese producto que queremos agregar (product.id), esta en el carrito (item.product.id), lo almacena en hasItem
    if (hasItem) {
      //map devuelve una nueva instancia de los items modificado su cantidad +1.
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        //sino coincide, devuelve el item sinc ambios
        return item;
      })
      //si hasItem es undefined, significa que el producto no está en el carrito. En este caso, lo agregamos como un nuevo elemento.
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();
    this.saveSession()
  }

  onDeleteCart(id: number): void {
    //filter crea un nuevo array sin el producto cuyo id coincide.
    this.items = this.items.filter(item => item.product.id !== id);
    //recordar item es un elemento del array items. Podría llamarse cualquier otra cosa.
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    //el metodo reduce se utiliza para recorrer un array y "reducirlo" a un solo valor
    //array.reduce((accumulator, currentValue) => { /* lógica de acumulación */ }, initialValue);
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0)
  }

  saveSession() : void{
    //JSON.stringify convierte un objeto o array de JavaScript en una cadena de texto en formato JSON.
    //setItem(clave,valor)
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
