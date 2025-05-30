import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { StaffResponseDTO } from '../../../../models';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-staff-login',
  imports: [FormsModule],
  templateUrl: './staff-login.component.html',
  styleUrl: './staff-login.component.css'
})
export class StaffLoginComponent {
  loginService = inject(LoginService)
    router = inject(Router);
  
    username = '';
    password = '';
    code = '';
  
    loginAdmin() {
      this.loginService.loginStaff(this.username, this.password).subscribe({
        next: (adminInfo: StaffResponseDTO) => {
          console.log('Login successful:', adminInfo);
          this.router.navigate(['staff-main-menu']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert(err.error.message);
        }
      });
    }
  
    goBack(){
      this.router.navigate(['/']);
    }
}
