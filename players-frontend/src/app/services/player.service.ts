import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private players: Player[] = [];

  private url: string = 'http://localhost:8080/api/players';

  constructor(private http: HttpClient) { }
  /**
     * Método que obtiene todos los jugadores desde el servidor.
     * Realiza una solicitud GET a una API y devuelve un Observable con un array de Player.
     */
  findAll(): Observable<Player[]> {
    // Realiza una solicitud HTTP GET a la URL especificada
    return this.http.get<Player[]>(this.url);
  }

  findById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.url}/${id}`);
  }

  create(player: Player): Observable<Player> {
    return this.http.post<Player>(this.url, player);
  }

  update(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.url}/${player.id}`, player);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}