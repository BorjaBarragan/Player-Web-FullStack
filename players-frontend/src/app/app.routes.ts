import { Routes } from '@angular/router';
import { PlayerComponent } from './components/player/player.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreComponent } from './components/store/store.component';

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
        component: CartComponent
    },
    {
        path:'cart',
        component:CartComponent
    }
];
