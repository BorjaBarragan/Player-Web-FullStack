import { Component } from '@angular/core';
import { Player } from '../../model/player';
import { Router, RouterModule } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'player',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './player.component.html',
})
export class PlayerComponent {

  title: string = "Plantilla de jugadores";

  players: Player[] = [];

  constructor(
    private service: PlayerService,
    private sharingData: SharingDataService,
    private router: Router
  ) {
    //Al darnos problemas la propiedad con undefined, creamos un condicional
    // Comprobamos si hay una navegación actual y si tiene un estado definido.
    if (this.router.getCurrentNavigation()?.extras.state) {
      //Opcion A- desde el estado de navegacion.
      // Si hay un estado, accedemos a la propiedad 'players' del estado.
      this.players = this.router.getCurrentNavigation()?.extras.state!['players'];
      // console.log("Constructor")
      // console.log(this.players)
    } else {
      //Opcion B- Desde el servicio.
      // Si no hay estado disponible (por ejemplo, cuando accedes directamente a la ruta),
      // llamamos al servicio para obtener todos los jugadores.
      this.service.findAll().subscribe(players => { 
        this.players = players
       });
    }
  }

  onDeletePlayer(id: number): void {
    this.sharingData.idPlayerEventEmitter.emit(id);
  }

  onSelectedPlayer(player: Player): void {
    this.router.navigate(['/players/edit', player.id], { state: { player } });
  }
}
