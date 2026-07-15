import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectApi } from '../../core/services/project-api';
import { IUser } from '../../core/models';
import { InitialsPipe } from '../../shared/pipes/initials-pipe';

@Component({
  selector: 'app-members',
  imports: [InitialsPipe],
  templateUrl: './members.html'
})
export class Members implements OnInit {
  private projectApi = inject(ProjectApi);
  private cdr = inject(ChangeDetectorRef);

  members: IUser[] = [];

  ngOnInit(): void {
    this.projectApi.getMembers().subscribe(members => {
      this.members = members;
      this.cdr.markForCheck();
    });
  }
}
