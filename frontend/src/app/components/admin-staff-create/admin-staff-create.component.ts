import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-staff-create',
  imports: [FormsModule, NgIf],
  templateUrl: './admin-staff-create.component.html',
  styleUrl: './admin-staff-create.component.css'
})
export class AdminStaffCreateComponent {

  adminService = inject(AdminService);
  router = inject(Router);

  username = '';
  password = '';
  isActive = true;

  message = '';
  error = '';

  createStaff() {
    if (!this.username || !this.password) {
      this.error = 'Felhasználónév és jelszó megadása kötelező!';
      return;
    }

    this.adminService.createStaff(this.username, this.password, this.isActive)
      .subscribe({
        next: (res) => {
          this.message = 'Dolgozó sikeresen létrehozva.';
          this.error = '';

        },
        error: (err) => {
          this.error = err.error?.message || 'Ismeretlen hiba történt.';
          this.message = '';
        }
      });
  }

  goBack() {
    this.router.navigate(['admin-main-menu']);
  }
}
