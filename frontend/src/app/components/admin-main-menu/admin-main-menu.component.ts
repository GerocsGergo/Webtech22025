import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-main-menu',
  imports: [NgIf],
  templateUrl: './admin-main-menu.component.html',
  styleUrl: './admin-main-menu.component.css'
})
export class AdminMainMenuComponent implements OnInit{
  router = inject(Router);
  adminService = inject(AdminService);

  isSuperAdmin: boolean = false;

  ngOnInit() {
    this.adminService.getCurrentAdmin().subscribe({
      next: (data) => {
        this.isSuperAdmin = data.isSuperAdmin;
      },
      error: (err) => {
        console.error('Nem sikerült lekérni az admin adatokat.', err);
        this.router.navigate(['admin-login']);
      }
    });
  }

  //Admin

  listAdmin() {
    this.router.navigate(['admin-list']);
  }

  createAdmin() {
    this.router.navigate(['admin-create']);
  }

  modifyAdmin() {
    this.router.navigate(['admin-modify']);
  }

  deleteAdmin() {
    this.router.navigate(['admin-delete']);
  }

  //Staff

  adminStaffList() {
    this.router.navigate(['admin-staff-list']);
  }

  adminStaffCreate() {
    this.router.navigate(['admin-staff-create']);
  }

  adminStaffModify() {
    this.router.navigate(['admin-staff-modify']);
  }

  //Egyéb

  goBack() {
    this.router.navigate(['admin-login']);
  }
}
