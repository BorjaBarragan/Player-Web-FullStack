import { EventEmitter, Injectable } from '@angular/core';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newPlayerEventEmitter = new EventEmitter();

  private _idPlayerEventEmitter = new EventEmitter();

  private _findPlayerByIdEventEmitter = new EventEmitter();

  private _selectPlayerEventEmitter = new EventEmitter();

  constructor() { }

  get newPlayerEventEmitter(): EventEmitter<Player> {
    return this._newPlayerEventEmitter
  }

  get idPlayerEventEmitter(): EventEmitter<number> {
    return this._idPlayerEventEmitter
  }

  get findPlayerByIdEventEmitter() {
    return this._findPlayerByIdEventEmitter
  }

  get selectPlayerEventEmitter() {
    return this._selectPlayerEventEmitter
  }
}
