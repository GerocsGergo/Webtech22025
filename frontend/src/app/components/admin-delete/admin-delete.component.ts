import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-delete',
  imports: [FormsModule, NgIf],
  templateUrl: './admin-delete.component.html',
  styleUrl: './admin-delete.component.css'
})
export class AdminDeleteComponent {
  adminService = inject(AdminService);
  router = inject(Router);

  adminId: number | null = null;

  errorMessage = '';
  successMessage = '';

  deleteAdmin() {
    if (this.adminId === null) {
      alert('Add meg az admin ID-t!');
      return;
    }

    this.adminService.deleteAdmin(this.adminId).subscribe({
      next: () => {
        //alert(`Admin (ID: ${this.adminId}) sikeresen deaktiválva.`);
        this.errorMessage = '';
        this.successMessage = `Admin sikeresen deaktiválva.`;
        this.adminId = null;
      },
      error: (err) => {
        console.error('Hiba:', err);
        //alert(err.error.message);
        this.successMessage = '';
        this.errorMessage = err.error.message;
      }
    });
  }

  activateAdmin() {
    if (this.adminId === null) {
      alert('Add meg az admin ID-t!');
      return;
    }

    this.adminService.activateAdmin(this.adminId).subscribe({
      next: () => {
        //alert(`Admin (ID: ${this.adminId}) sikeresen aktiválva.`);
        this.errorMessage = '';
        this.successMessage =`Admin sikeresen aktiválva.`;
        this.adminId = null;
      },
      error: (err) => {
        console.error('Hiba:', err);
        this.successMessage = '';
        this.errorMessage = err.error.message;
      }
    });
  }

  goBack() {
    this.router.navigate(['admin-main-menu']);
  }
}
