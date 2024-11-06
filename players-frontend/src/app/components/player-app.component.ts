import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player';
import { PlayerService } from '../services/player.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'player-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './player-app.component.html',
  styleUrls: ['./player-app.component.css']
})
export class PlayerAppComponent implements OnInit {

  players: Player[] = [];

  constructor(
    private service: PlayerService,
    private sharingData: SharingDataService,
    private router: Router) {

  }
  //Aquí es donde colocamos el código que necesita datos para cargar la interfaz, ya que el componente está listo para recibirlos.
  ngOnInit(): void {
    this.service.findAll().subscribe(players => {
      this.players = players
      // console.log("ngInit")
      // console.log(this.players)
    });
    this.addPlayer();
    this.deletePlayer();
    this.findPlayerById();
  }

  findPlayerById() {
    this.sharingData.findPlayerByIdEventEmitter.subscribe(id => {
      const player = this.players.find(player => player.id == id);
      this.sharingData.selectPlayerEventEmitter.emit(player);
    })
  }

  addPlayer() {
    this.sharingData.newPlayerEventEmitter.subscribe(player => {
      if (player.id > 0) {
        this.service.update(player).subscribe(playerUpdated => {
          this.players = this.players.map(p => (p.id == playerUpdated.id) ? { ...playerUpdated } : p);
        })
      } else {
        this.service.create(player).subscribe(playerNew => {
          this.players = [...this.players, { ...playerNew }];
        })
      }
      this.router.navigate(['/players']);
      Swal.fire({
        title: "Saved!",
        text: "The player is saved successfully",
        icon: "success"
      });
    });
  }


  // El filter solo se puede utilizar en matrices y devuelve una matriz que contiene solo los elementos coincidentes.
  deletePlayer(): void {
    this.sharingData.idPlayerEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Do you want delete this player?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        //then se ejecuta despues de responder la alerta
      }).then((result) => {
        if (result.isConfirmed) {
          //crea un nuvo aray de players excluyendo el jugador con el id qeu se pasa.
          this.players = this.players.filter(player => player.id != id);
          //Cuando estamos en la misma pagina debemos navegar a otra para luego volver y que se vea actualizado.
          //El then() se usa solo para ejecutar algo después de que la promesa se haya resuelto, sin importar el resultado
          this.router.navigate(['/players/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/players'], { state: { players: this.players } })
          })
          Swal.fire({
            title: "Deleted!",
            text: "The player has been deleted.",
            icon: "success"
          });
        }
      });
    });
  }
}
