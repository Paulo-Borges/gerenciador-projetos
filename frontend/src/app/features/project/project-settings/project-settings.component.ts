import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-project-settings',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent {
  private route = inject(ActivatedRoute);
  project: Project = this.route.parent!.snapshot.data['project'];
}
