import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminApi } from '../../../core/services/admin-api';
import { InitialsPipe } from '../../../shared/pipes/initials-pipe';

@Component({
  selector: 'app-users',
  imports: [InitialsPipe, RouterLink, RouterLinkActive],
  templateUrl: './users.html'
})
export class Users {
  private readonly _adminApi = inject(AdminApi);
  users = toSignal(this._adminApi.getUsers(), { initialValue: [] });
}
