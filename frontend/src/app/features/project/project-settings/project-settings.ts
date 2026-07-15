import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-project-settings',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project-settings.html',
  styleUrls: ['./project-settings.scss']
})
export class ProjectSettings {
  private route = inject(ActivatedRoute);
  project: Project = this.route.parent!.snapshot.data['project'];
}
