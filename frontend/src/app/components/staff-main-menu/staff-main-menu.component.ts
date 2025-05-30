import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-main-menu',
  imports: [],
  templateUrl: './staff-main-menu.component.html',
  styleUrl: './staff-main-menu.component.css'
})
export class StaffMainMenuComponent {
  router = inject(Router);
  staffService = inject(StaffService);  


  //Staff

  gameList() {
    this.router.navigate(['game-list']);
  }

  gameSearch() {
    this.router.navigate(['game-search']);
  }


  gameCreate() {
    this.router.navigate(['game-create']);
  }

  gameModify() {
    this.router.navigate(['game-modify']);
  }

  gameDelete() {
    this.router.navigate(['game-delete']);
  }

  //Egyéb

  goBack() {
    this.router.navigate(['staff-login']);
  }
}
