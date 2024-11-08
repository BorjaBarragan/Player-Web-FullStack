import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Player } from '../../model/player';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'player-form',
  standalone: true,
  //importar FormsModule nos permite el uso de :[(ngModel)], ngSubmit, y validaciones de formularios como required, minlength, y maxlength.
  imports: [FormsModule, CommonModule],
  templateUrl: './player-form.component.html',
})

export class PlayerFormComponent implements OnInit {

  player: Player;
  errors : any = {};

  //Inicializamos propiedad player en el constructor. 
  //Esto asegura que player este vacio al inicio, para poder llenarse con datos del form.
  constructor(
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private service: PlayerService
  ) {
    this.player = new Player;
  }

  ngOnInit(): void {
    this.sharingData.errorsPlayerFormEventEmitter.subscribe(errors => this.errors = errors)
    this.sharingData.selectPlayerEventEmitter.subscribe(player => this.player = player);
    this.route.paramMap.subscribe(params => {
      const id: number = + (params.get('id') || '0');
      if(id > 0 ){
        this.service.findById(id).subscribe(player => this.player=player)
        // this.sharingData.findPlayerByIdEventEmitter.emit(id);
      }
    });
  }

  onSubmit(playerForm: NgForm): void {
    // if (playerForm.valid) {
      this.sharingData.newPlayerEventEmitter.emit(this.player);
    // }
    // playerForm.reset();
    // playerForm.resetForm();
  }

  onClear(playerForm: NgForm): void {
    this.player = new Player();
    playerForm.reset();
    playerForm.resetForm();
  }
}
