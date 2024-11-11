import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerAppComponent } from './components/player-app.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreComponent } from './components/store/store.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerAppComponent,PlayerFormComponent,CartComponent,StoreComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {

}
