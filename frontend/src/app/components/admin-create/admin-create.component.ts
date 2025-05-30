import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create',
  imports: [FormsModule],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent {
  adminService = inject(AdminService);
  router = inject(Router);

  username = '';
  password = '';
  code = '';

  createAdmin() {
    if (!this.username || !this.password || !this.code) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }

    this.adminService.createAdmin(this.username, this.password, this.code).subscribe({
      next: () => {
        alert('Admin sikeresen létrehozva!');
        this.router.navigate(['admin-main-menu']);
      },
      error: (err) => {
        console.error('Hiba:', err);
        alert(err.error.message);
      }
    });
  }

  goBack() {
    this.router.navigate(['admin-main-menu']);
  }
}
