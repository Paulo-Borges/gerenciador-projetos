import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ProjectApi } from '../../core/services/project-api';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  private projectApi = inject(ProjectApi);
  projects = toSignal(this.projectApi.getAll(), { initialValue: [] });
}
