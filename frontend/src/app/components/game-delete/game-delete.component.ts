import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { GameDTO } from '../../../../models';
import { JatekKategoria } from '../../../../backend/src/enums/game-category.enum';
import { Platform } from '../../../../backend/src/enums/platform.enum';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-game-delete',
  imports: [FormsModule, NgIf],
  templateUrl: './game-delete.component.html',
  styleUrl: './game-delete.component.css'
})
export class GameDeleteComponent {
  showDeletePopup = false;
  staffService = inject(StaffService);
    router = inject(Router);
  
    id: number = 0;
    game: any = null;

  
    errorMessage = '';
    successMessage = '';

    loadGame(){
      if (!this.id) {
        this.errorMessage = 'Adj meg egy érvényes ID-t!';
        return;
      }
  
      this.staffService.getGameById(this.id).subscribe({
        next: (data) => {
          this.game = data;
          this.errorMessage = '';
          this.successMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.game = null;
        }
      });
    }

    confirmDelete() {
      this.showDeletePopup = true;
      this.errorMessage = '';
    }

    closeDeletePopup() {
      this.showDeletePopup = false;
    }

    deleteGame() {
      this.staffService.deleteGame(this.game.sorszam).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.game = null;
          this.closeDeletePopup();
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Hiba történt a törlés során.';
        }
      });
    }

    goBack() {
      this.router.navigate(['staff-main-menu']);
    }
}
