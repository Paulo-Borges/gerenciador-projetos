import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminApi } from '../../../core/services/admin-api';
import { IUser } from '../../../core/models';
import { InitialsPipe } from '../../../shared/pipes/initials-pipe';

@Component({
  selector: 'app-users',
  imports: [InitialsPipe, RouterLink, RouterLinkActive],
  templateUrl: './users.html'
})
export class Users implements OnInit {
  private adminApi = inject(AdminApi);
  private cdr = inject(ChangeDetectorRef);
  users: IUser[] = [];

  ngOnInit(): void {
    this.adminApi.getUsers().subscribe(users => {
      this.users = users;
      this.cdr.markForCheck();
    });
  }
}
