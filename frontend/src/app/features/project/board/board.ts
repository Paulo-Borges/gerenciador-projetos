import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectApi } from '../../../core/services/project-api';
import { Project, Task } from '../../../core/models';

@Component({
  selector: 'app-board',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './board.html'
})
export class Board implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectApi = inject(ProjectApi);

  project: Project = this.route.parent!.snapshot.data['project'];
  tasks = signal<Task[]>(this.route.snapshot.data['tasks'] || []);

  todoTasks = computed(() => this.tasks().filter((t) => t.status === 'todo'));
  inProgressTasks = computed(() => this.tasks().filter((t) => t.status === 'in_progress'));
  doneTasks = computed(() => this.tasks().filter((t) => t.status === 'done'));

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['tasks']) {
        this.tasks.set(data['tasks']);
      }
    });
  }

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
