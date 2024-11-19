import { Routes, RouterModule} from '@angular/router';
import { PlayerComponent } from './components/player/player.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { CartAppComponent } from './components/cart-app/cart-app.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/players'
    },
    {
        path: 'players',
        component: PlayerComponent
    },
    {
        path: 'players/create',
        component: PlayerFormComponent,
    },
    {
        path: 'players/edit/:id',
        component: PlayerFormComponent
    },
    {
        path: 'store',
        component: CartAppComponent
    },
    {
        path:'cart',
        component:CartComponent
    }
];
