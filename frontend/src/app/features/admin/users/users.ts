import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../core/models';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-users',
  imports: [InitialsPipe, RouterLink, RouterLinkActive],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class Users implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  users: User[] = [];

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
      this.cdr.markForCheck();
    });
  }
}
