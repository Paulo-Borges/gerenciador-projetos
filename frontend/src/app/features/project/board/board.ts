import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectApi } from '../../../core/services/project-api';
import { IProject, ITask } from '../../../core/models';

@Component({
  selector: 'app-board',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './board.html'
})
export class Board {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectApi = inject(ProjectApi);

  project: IProject = this.route.parent!.snapshot.data['project'];
  tasks = signal<ITask[]>(this.route.snapshot.data['tasks'] || []);

  todoTasks = computed(() => this.tasks().filter((t) => t.status === 'todo'));
  inProgressTasks = computed(() => this.tasks().filter((t) => t.status === 'in_progress'));
  doneTasks = computed(() => this.tasks().filter((t) => t.status === 'done'));

  loadTasks(): void {
    this.projectApi.getTasks(this.project.id).subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  openTask(taskId: string): void {
    this.router.navigate([{ outlets: { detail: ['task', taskId] } }], {
      relativeTo: this.route.parent,
    });
  }
}
