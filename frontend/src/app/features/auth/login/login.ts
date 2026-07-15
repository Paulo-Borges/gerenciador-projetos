import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManager } from '../../../core/services/auth-manager';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {
  email = '';
  error = '';
  isLoading = false;

  private authManager = inject(AuthManager);
  private router = inject(Router);

  login(): void {
    this.isLoading = true;
    this.error = '';
    this.authManager.login(this.email).subscribe({
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
