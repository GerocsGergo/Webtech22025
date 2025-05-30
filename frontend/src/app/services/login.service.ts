import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminResponseDTO, StaffResponseDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})


export class LoginService {
  http = inject(HttpClient);

  loginAdmin(username: string, password: string, code: string) {
    return this.http.post<AdminResponseDTO>('/api/loginAdmin', { username, password, code });
  }

  loginStaff(username: string, password: string) {
    return this.http.post<StaffResponseDTO>('/api/loginStaff', { username, password });
  }



}