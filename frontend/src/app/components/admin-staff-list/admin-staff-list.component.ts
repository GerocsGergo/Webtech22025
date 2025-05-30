import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StaffResponseDTO } from '../../../../models';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-admin-staff-list',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './admin-staff-list.component.html',
  styleUrl: './admin-staff-list.component.css'
})
export class AdminStaffListComponent {

  adminService = inject(AdminService);
  router = inject(Router);

  staffList: StaffResponseDTO[] = [];
  message = '';
  error = '';

  ngOnInit() {
    this.loadStaff();
  }

  loadStaff() {
    this.adminService.listAllStaff().subscribe({
      next: (res) => {
        this.staffList = res;
      },
      error: (err) => {
        this.error = 'Dolgozók betöltése sikertelen.';
      }
    });
  }

  goBack() {
    this.router.navigate(['admin-main-menu']);
  }
}
