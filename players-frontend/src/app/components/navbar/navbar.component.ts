import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Player } from '../../model/player';
import { CartItem } from '../../model/cartItem';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  @Input() players: Player[] = [];

  @Input() items: CartItem[] = [];

  @Output() openEventEmitter = new EventEmitter();

  @Input() totalItems : number = 0 ;

  openCart():void {
    this.openEventEmitter.emit();
  }

}
