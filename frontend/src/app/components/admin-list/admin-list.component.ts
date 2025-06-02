import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminResponseDTO } from '../../../../models';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-admin-list',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit{
  
    adminService = inject(AdminService);
    router = inject(Router);
  
    adminList: AdminResponseDTO[] = [];
    message = '';
    error = '';

    ngOnInit() {
      this.loadAdmin();
    }

    loadAdmin() {
      this.adminService.listAllAdmin().subscribe({
        next: (res) => {
          this.adminList = res;
        },
        error: (err) => {
          this.error = 'Adminisztrátorok betöltése sikertelen.';
        }
      });
    }
  
    goBack() {
      this.router.navigate(['admin-main-menu']);
    }

}
