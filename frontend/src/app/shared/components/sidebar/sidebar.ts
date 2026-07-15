import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HasRoleDirective } from '../../directives/has-role.directive';
import { InitialsPipe } from '../../pipes/initials.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, HasRoleDirective, InitialsPipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
