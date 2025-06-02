import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-create',
  imports: [FormsModule, NgIf],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent {
  adminService = inject(AdminService);
  router = inject(Router);

  username = '';
  password = '';
  code = '';

  errorMessage='';
  successMessage='';

  createAdmin() {
    if (!this.username || !this.password || !this.code) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }

    this.adminService.createAdmin(this.username, this.password, this.code).subscribe({
      next: () => {
        this.username = '';
        this.password = '';
        this.code = '';
        this.errorMessage = '';
        this.successMessage = 'Admin sikeresen létrehozva!';
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
