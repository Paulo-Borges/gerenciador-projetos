import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectApi } from '../../core/services/project-api';
import { Project } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  private projectApi = inject(ProjectApi);
  private cdr = inject(ChangeDetectorRef);

  projects: Project[] = [];

  ngOnInit(): void {
    this.projectApi.getAll().subscribe(projects => {
      this.projects = projects;
      this.cdr.markForCheck();
    });
  }
}
