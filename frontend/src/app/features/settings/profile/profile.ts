import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthManager } from '../../../core/services/auth-manager';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './profile.html'
})
export class Profile {
  readonly _authManager = inject(AuthManager);
}
