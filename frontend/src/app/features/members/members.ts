import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { User } from '../../core/models';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-members',
  imports: [InitialsPipe],
  templateUrl: './members.html',
  styleUrls: ['./members.scss']
})
export class Members implements OnInit {
  private projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);

  members: User[] = [];

  ngOnInit(): void {
    this.projectService.getMembers().subscribe(members => {
      this.members = members;
      this.cdr.markForCheck();
    });
  }
}
