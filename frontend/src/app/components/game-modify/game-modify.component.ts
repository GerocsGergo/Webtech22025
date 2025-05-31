import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { GameDTO } from '../../../../models';
import { JatekKategoria } from '../../../../backend/src/enums/game-category.enum';
import { Platform } from '../../../../backend/src/enums/platform.enum';
import { NgFor, NgIf } from '@angular/common';

type UpdatableStaffField = 'cim' | 'kategoria' | 'platform';

@Component({
  selector: 'app-game-modify',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './game-modify.component.html',
  styleUrl: './game-modify.component.css'
})
export class GameModifyComponent {
  staffService = inject(StaffService);
  router = inject(Router);

  id: number = 0;
  game: any = null;

  showUpdatePopup = false;
  fieldToUpdate: UpdatableStaffField = 'cim';
  newValue: string | boolean = '';

  kategoriaLista = Object.values(JatekKategoria);
  platformLista = Object.values(Platform);

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

  openUpdatePopup(field: UpdatableStaffField) {
    this.fieldToUpdate = field;
    this.newValue = "";
    this.showUpdatePopup = true;
  }

  closeUpdatePopup() {
    this.showUpdatePopup = false;
    this.fieldToUpdate = 'cim';
    this.newValue = '';
  }

  getFormattedField(field: string): string {
    switch (field) {
      case 'cim':
        return 'Cím';
      case 'kategoria':
        return 'Kategória';
        case 'platform':
        return 'Platform';
      default:
        return '';
    }
  }

  updateGame() {
    if (!this.newValue) {
      this.errorMessage = 'Adj meg egy új értéket!';
      return;
    }
  
    const updateData: any = {};
    updateData[this.fieldToUpdate] = this.newValue;
  
    this.staffService.modifyGame(this.game.sorszam, updateData).subscribe({
      next: (res) => {
        this.successMessage = 'Sikeres módosítás!';
        this.errorMessage = '';
        this.game = { ...this.game, ...updateData };
        this.closeUpdatePopup();
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Hiba történt a módosítás során.';
      }
    });
  }

  goBack() {
    this.router.navigate(['staff-main-menu']);
  }
}


