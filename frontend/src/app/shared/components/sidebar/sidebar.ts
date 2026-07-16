import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthManager } from '../../../core/services/auth-manager';
import { HasRoleDirective } from '../../directives/has-role-directive';
import { InitialsPipe } from '../../pipes/initials-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, HasRoleDirective, InitialsPipe],
  templateUrl: './sidebar.html'
})
export class Sidebar {
  readonly _authManager = inject(AuthManager);

  logout(): void {
    this._authManager.logout();
  }
}
