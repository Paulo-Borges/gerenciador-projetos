import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectApi } from '../../../core/services/project-api';
import { Project, Task } from '../../../core/models';

@Component({
  selector: 'app-backlog',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './backlog.html'
})
export class Backlog implements OnInit {
  private route = inject(ActivatedRoute);
  private projectApi = inject(ProjectApi);
  private cdr = inject(ChangeDetectorRef);

  project: Project = this.route.parent!.snapshot.data['project'];
  tasks: Task[] = this.route.snapshot.data['tasks'] || [];

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['tasks']) {
        this.tasks = data['tasks'];
        this.cdr.markForCheck();
      }
    });
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      'todo': 'A Fazer',
      'in_progress': 'Em Progresso',
      'done': 'Concluído'
    };
    return map[status] || status;
  }
}
