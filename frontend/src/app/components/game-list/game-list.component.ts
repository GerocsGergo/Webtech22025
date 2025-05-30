import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { GameDTO } from '../../../../models';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [NgFor, CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit{
  router = inject(Router);
  staffService = inject(StaffService);

  games: GameDTO[] = [];

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.staffService.getAllGames().subscribe({
      next: (res) => {
        this.games = res;
      },
      error: (err) => {
        console.error('Hiba a játékok betöltésekor:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/staff-main-menu']);
  }
}
