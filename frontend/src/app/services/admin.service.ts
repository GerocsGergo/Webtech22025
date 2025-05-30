import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminResponseDTO, StaffResponseDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})


export class AdminService {
  http = inject(HttpClient);


  //Staff methods for admin menu
  createStaff(username: string, password: string) {
    return this.http.post<StaffResponseDTO>('/api/createStaff', { username, password});
  }

  getStaffById(id: number) {
    return this.http.get<StaffResponseDTO>(`/api/getStaff/` + id);
  }
  

  modifyStaff(id: number, username?: string, password?: string) {
    return this.http.put<StaffResponseDTO>(`/api/modifyStaff/` + id, { username, password});
  }

  deleteStaff(id: number) {
    return this.http.put<{ message: string, staff: StaffResponseDTO }>(`/api/deleteStaff/` + id, {});
  }

  activateStaff(id: number) {
    return this.http.put<StaffResponseDTO>(`/api/activateStaff/` + id, {});
  }

  listAllStaff() {
    return this.http.get<StaffResponseDTO[]>('/api/listAllStaff');
  }


  //ADMIN

  createAdmin(username: string, password: string, code: string) {
    return this.http.post<AdminResponseDTO>('/api/createAdmin', { username, password, code });
  }

  modifyAdmin(id: number, newPassword?: string, newCode?: string) {
    return this.http.put(`/api/modifyAdmin/`+ id, { newPassword, newCode });
  }

  deleteAdmin(id: number) {
    return this.http.put(`/api/deleteAdmin/` + id, {});
  }

  activateAdmin(id: number) {
    return this.http.put(`/api/activateAdmin/` + id, {});
  }
 
  getCurrentAdmin() {
    return this.http.get<{ isSuperAdmin: boolean }>('/api/getCurrentAdmin', { withCredentials: true })

  }

}