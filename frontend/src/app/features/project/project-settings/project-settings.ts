import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IProject } from '../../../core/models';

@Component({
  selector: 'app-project-settings',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project-settings.html'
})
export class ProjectSettings {
  private route = inject(ActivatedRoute);
  project: IProject = this.route.parent!.snapshot.data['project'];
}
