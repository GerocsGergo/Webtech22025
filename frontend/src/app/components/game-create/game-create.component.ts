import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { GameDTO } from '../../../../models';
import { JatekKategoria } from '../../../../backend/src/enums/game-category.enum';
import { Platform } from '../../../../backend/src/enums/platform.enum';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-game-create',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './game-create.component.html',
  styleUrl: './game-create.component.css'
})
export class GameCreateComponent {

  staffService = inject(StaffService);
  router = inject(Router);

  newGame: Omit<GameDTO, 'sorszam' | 'beszerzes_datuma'> = {
    cim: '',
    kategoria: JatekKategoria.AKCIO,
    platform: Platform.PC
  };

  kategoriaLista = Object.values(JatekKategoria);
  platformLista = Object.values(Platform);

  errorMessage = '';
  successMessage = '';

  createGame() {
    this.staffService.createGame(this.newGame).subscribe({
      next: (res) => {
        this.successMessage = 'Játék sikeresen hozzáadva!';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Hiba történt a mentés során.';
      }
    });
  }

  goBack() {
    this.router.navigate(['/staff-main-menu']);
  }

}
