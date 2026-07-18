import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IProject } from '../../../core/models';

@Component({
  selector: 'app-project-settings',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project-settings.html'
})
export class ProjectSettings {
  //TODO: remover
  private readonly _activatedRoute = inject(ActivatedRoute);
  //TODO: remover e mockar projeto
  project: IProject = this._activatedRoute.parent!.snapshot.data['project'];
}
