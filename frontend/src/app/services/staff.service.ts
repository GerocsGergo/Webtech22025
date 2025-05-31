import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GameDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})


export class StaffService {
  http = inject(HttpClient);

   getAllGames() {
    return this.http.get<GameDTO[]>('/api/getAllGames');
  }

  findGames(id?: number, cim?: string, kategoria?: string, platform?: string) {
    let params = new HttpParams();
  
    if (id !== undefined) {
      params = params.set('id', id);
    }
    if (cim) {
      params = params.set('cim', cim);
    }
    if (kategoria) {
      params = params.set('kategoria', kategoria);
    }
    if (platform) {
      params = params.set('platform', platform);
    }
  
    return this.http.get<GameDTO | GameDTO[]>('/api/getGame', { params });
  }
  
  getGameById(id: number){
    return this.http.get<GameDTO>('/api/getGameById/' + id);
  }

  createGame(game: Omit<GameDTO, 'sorszam' | 'beszerzes_datuma'>) {
    return this.http.post<GameDTO>('/api/createGame', game);
  }

  modifyGame(id: number, data: any) {
    return this.http.put('/api/modifyGame/' + id, data);
  }
  

  deleteGame(id: number) {
    return this.http.delete<{ message: string }>(`/api/deleteGame/` + id);
  }
}