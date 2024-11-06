import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Player } from '../../model/player';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  @Input() players: Player[] = [];
  
}
