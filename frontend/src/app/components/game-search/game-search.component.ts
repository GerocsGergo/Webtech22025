import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { GameDTO } from '../../../../models';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JatekKategoria } from '../../../../backend/src/enums/game-category.enum';
import { Platform } from '../../../../backend/src/enums/platform.enum';

@Component({
  selector: 'app-game-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './game-search.component.html',
  styleUrl: './game-search.component.css'
})
export class GameSearchComponent {
  router = inject(Router);
  staffService = inject(StaffService);

  games: GameDTO[] = [];

  id?: number;
  cim?: string;
  kategoria?: string;
  platform?: string;

  kategoriaLista = Object.values(JatekKategoria);
  platformLista = Object.values(Platform);

  errorMessage = '';

  searchGames() {
    this.staffService.findGames(this.id, this.cim, this.kategoria, this.platform).subscribe({
      next: (res) => {
        this.errorMessage = '';
        this.games = Array.isArray(res) ? res : [res];
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Hiba a keresés során.';
        this.games = [];
      }
    });
  }

  goBack() {
    this.router.navigate(['/staff-main-menu']);
  }
}
