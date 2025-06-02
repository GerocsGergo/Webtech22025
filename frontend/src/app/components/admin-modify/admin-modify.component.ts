import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-modify',
  imports: [FormsModule, NgIf],
  templateUrl: './admin-modify.component.html',
  styleUrl: './admin-modify.component.css'
})
export class AdminModifyComponent {
  adminService = inject(AdminService);
  router = inject(Router);

  id!: number;               // Kötelező, admin ID amit módosítani akarunk
  newPassword: string = '';
  newCode: string = '';

  errorMessage = '';
  successMessage = '';

  modifyAdmin() {
    if (!this.id) {
      alert('Adj meg egy admin ID-t!');
      return;
    }

    this.adminService.modifyAdmin(this.id, this.newPassword, this.newCode).subscribe({
      next: () => {
        this.errorMessage = '';
        this.successMessage = 'Admin sikeresen módosítva.';
      },
      error: err => {
        console.error('Hiba történt:', err);
        this.successMessage = '';
        this.errorMessage = err.error.message || 'Hiba történt a módosítás során.';
      }
    });
  }

  goBack() {
    this.router.navigate(['admin-main-menu']);
  }
}
