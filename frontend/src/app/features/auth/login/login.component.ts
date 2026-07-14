import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  error = '';
  isLoading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  login(): void {
    this.isLoading = true;
    this.error = '';
    this.authService.login(this.email).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Email inválido. Tente felipe@example.com ou ana@example.com';
        this.isLoading = false;
      }
    });
  }
}
