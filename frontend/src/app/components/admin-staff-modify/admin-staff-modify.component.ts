import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

type UpdatableStaffField = 'username' | 'password' | 'isActive';

@Component({
  selector: 'app-admin-staff-modify',
  imports: [FormsModule, NgIf],
  templateUrl: './admin-staff-modify.component.html',
  styleUrl: './admin-staff-modify.component.css'
})
export class AdminStaffModifyComponent {
  adminService = inject(AdminService);
  router = inject(Router);

  id: number = 0;
  staff: any = null;

  showUpdatePopup = false;
  fieldToUpdate: UpdatableStaffField = 'username';
  newValue: string | boolean = '';

  errorMessage = '';
  successMessage = '';

  loadStaff() {
    if (!this.id) {
      this.errorMessage = 'Adj meg egy érvényes ID-t!';
      return;
    }

    this.adminService.getStaffById(this.id).subscribe({
      next: (data) => {
        this.staff = data;
        this.errorMessage = '';
        this.successMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.staff = null;
      }
    });
  }

  openUpdatePopup(field: UpdatableStaffField) {
    this.fieldToUpdate = field;
    this.newValue = field === 'isActive' ? this.staff.isActive : '';
    this.showUpdatePopup = true;
  }

  closeUpdatePopup() {
    this.showUpdatePopup = false;
    this.fieldToUpdate = 'username';
    this.newValue = '';
  }

  updateStaff() {
    const payload: any = {};
    payload[this.fieldToUpdate] = this.newValue;

    this.adminService.modifyStaff(
      this.id,
      payload.username,
      payload.password
    ).subscribe({
      next: (res) => {
        this.successMessage = 'Dolgozó sikeresen frissítve!';
        this.errorMessage = '';
        this.staff = { ...this.staff, ...payload };
        this.closeUpdatePopup();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }

  getFormattedField(field: string): string {
    switch (field) {
      case 'username':
        return 'Felhasználónév';
      case 'password':
        return 'Jelszó';
      default:
        return '';
    }
  }

  inactivateStaff() {
    this.adminService.deleteStaff(this.id).subscribe({
      next: (res) => {
        this.successMessage = 'Dolgozó inaktiválva!';
        this.errorMessage = '';
        this.staff.isActive = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
  
  activateStaff() {
    this.adminService.activateStaff(this.id).subscribe({
      next: (res) => {
        this.successMessage = 'Dolgozó aktiválva!';
        this.errorMessage = '';
        this.staff.isActive = true;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }

  goBack() {
    this.router.navigate(['admin-main-menu']);
  }
}

