import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerAppComponent } from './components/player-app.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerAppComponent,PlayerFormComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {

}
