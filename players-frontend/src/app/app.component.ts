import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerAppComponent } from './components/player-app.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { CartAppComponent } from './components/cart-app/cart-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerAppComponent,PlayerFormComponent,CartAppComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {

}
