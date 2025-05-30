import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AdminResponseDTO } from '../../../../models';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  loginService = inject(LoginService)
  router = inject(Router);

  username = '';
  password = '';
  code = '';

  loginAdmin() {
    this.loginService.loginAdmin(this.username, this.password, this.code).subscribe({
      next: (adminInfo: AdminResponseDTO) => {
        console.log('Login successful:', adminInfo);
        this.router.navigate(['admin-main-menu']);
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
