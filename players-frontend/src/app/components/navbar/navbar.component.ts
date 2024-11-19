import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Player } from '../../model/player';
import { CartItem } from '../../model/cartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{


  @Input() players: Player[] = [];

  @Input() items: CartItem[] = [];

  @Input() total = 0;

  @Output() openEventEmitter = new EventEmitter();

  totalItems : number = 0 ;

  constructor(private cartService: CartService,) {

  }

   ngOnInit(): void {
    this.cartService.totalItems.subscribe(totalItems => {
      this.totalItems = totalItems;
    });
  }

  openCart():void {
    this.openEventEmitter.emit();
  }

}
